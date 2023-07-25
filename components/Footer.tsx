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
        className="mx-0.5 my-0.5 md:p-20 md:bg-bgGray"
      >
        <p className=" hover:text-textPink">About the Team</p>
        <div className="m-12 flex md:grid md:grid-cols-4">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>5</p>
        </div>
      </div>
    </footer>
  )
}