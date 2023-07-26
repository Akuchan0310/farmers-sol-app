export default function Footer() {
  return (
    <footer className="w-full bg-black text-white md:text-bgGreen md:bg-bgLight justify-center text-center bottom-0 grid grid-cols-2">
      <div
        className="mx-0.25 my-0.5 md:p-20 md:bg-bgGray text-cyan-600 font-bold"
      >
        FarmDidi
        <div>LoGO&copy;</div>
        <div></div>
      </div>
      <div
        className="mx-0.5 my-0.5 md:py-20 md:bg-bgGray"
      >
        <div className="w-full hover:text-textPink md:border-b border-bgLight">About the Team</div>
        <div className="m-12 flex justify-between">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
    </footer>
  )
}