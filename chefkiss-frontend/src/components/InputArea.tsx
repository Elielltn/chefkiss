type inputAreaProps = {
  onOpenModal: () => void
}


function InputArea({onOpenModal}: inputAreaProps) {
  return (
    <div className="flex items-center justify-between mb-[36px]">
      <input
        type="text"
        placeholder="Digite o nome de uma receita aqui..."
        className="text-[#593700] bg-[#A97D47] border-2 rounded-lg border-[#593700] p-[15px] max-w-[790px] w-[100%]"
      />
      <button className="bg-[#593700] rounded-[999px]" onClick={onOpenModal}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M25 12.5L25 37.5" stroke="#FFD6A8" strokeLinecap="round" />
          <path d="M37.5 25L12.5 25" stroke="#FFD6A8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default InputArea;
