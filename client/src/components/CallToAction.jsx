import { Button } from "flowbite-react"

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">
                Know More About the Legends...
            </h2>
            <p className="text-gray-500 my-2">
            Curious about the legends of football? Discover the incredible journeys of iconic players who changed the game forever. Dive into their stories and be inspired by their passion and greatness!

            </p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
                <a href="https://footballsgreatest.weebly.com/legends.html" target="_blank" rel="noopener noreferrer">The Legends Of Football</a>
            </Button>
        </div>
        <div className="p-7">
            <img src="https://i.etsystatic.com/29534914/r/il/f2a79b/4731484476/il_570xN.4731484476_ln5j.jpg" alt="" />
        </div>
      
    </div>
  )
}

export default CallToAction
