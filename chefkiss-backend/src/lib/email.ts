import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "ChefKiss <onboarding@resend.dev>",
    to: email,
    subject: "Redefinição de senha - ChefKiss",
    html: `
      <p>Você solicitou a redefinição de senha.</p>
      <p><a href="${resetLink}">Clique aqui para criar uma nova senha</a></p>
      <p>Esse link expira em 1 hora. Se você não solicitou isso, ignore este e-mail.</p>
    `,
  });
}
