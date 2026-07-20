import type { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { sendPasswordResetEmail } from "../lib/email.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schemas/authSchemas.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";

export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { email, password } = result.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: "E-mail já cadastrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });

  return res.status(201).json({ message: "Conta criada com sucesso." });
}

export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });

  return res.status(200).json({ message: "Login realizado com sucesso." });
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.userId) {
    return res.status(401).json({ error: "Não autenticado." });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true },
  });
  return res.status(200).json(user);
}

export function logout(req: Request, res: Response) {
  res.clearCookie("token", { path: "/" });
  return res.status(200).json({ message: "Logout realizado." });
}

export async function forgotPassword(req: Request, res: Response) {
  const result = forgotPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { email } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res
      .status(200)
      .json({ message: "Se o e-mail existir, um link será enviado." });
  }

  await prisma.passwordResetToken.updateMany({
    where: { userId: user.id, used: false },
    data: { used: true },
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt },
  });

  await sendPasswordResetEmail(user.email, token);

  return res
    .status(200)
    .json({ message: "Se o e-mail existir, um link será enviado." });
}

export async function resetPassword(req: Request, res: Response) {
  const result = resetPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { token, newPassword } = result.data;

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    return res.status(400).json({ error: "Link inválido ou expirado." });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    }),
  ]);

  return res.status(200).json({ message: "Senha redefinida com sucesso." });
}
