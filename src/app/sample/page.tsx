

export default function SamplePage(){
  return (
    <div className="bg-black w-full h-screen flex justify-center box-border p-12">
      <div className="flex flex-col w-full">
        <h1 className="w-full text-center text-4xl py-2 font-bold">Sample Page</h1>
        <div className="bg-blue-400 h-16 w-full">Navbar</div>
        <div className="flex h-screen">
          <div className="bg-red-300 w-32">sidebar</div>
          <div className="w-full p-4 box-border flex">
            <div className="bg-green-400 w-full flex p-4 rounded-md">
              <h1>Work Area</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}