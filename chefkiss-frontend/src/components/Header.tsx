import Logo from "./Logo";

function Header() {
  return (
    <header className="flex items-center justify-between mb-[48px]">
      <Logo fontSize={64}/>
      <button className="transition text-[#593700] hover:text-[#FFCC91] border-2 border-[#593700] rounded-lg hover:bg-[#593700] px-[30px] py-[15px]">Sair</button>
    </header>
  );
}

export default Header;
