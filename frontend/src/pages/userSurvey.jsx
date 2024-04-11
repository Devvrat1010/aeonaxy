import Navbar from "../components/navbar"
import { useEffect, useState } from "react"
import surveyEye from '../assets/surveyEye.png'
import surveyMixer from '../assets/surveyMixer.png'
import surveyPot from '../assets/surveyPot.png'
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom"

export default function userSurvey() {
    const [currUser, setCurrUser] = useState({})

    const styles = ""
    const navigate = useNavigate()

    const [survey, setClick] = useState({ surveyEye: false, surveyMixer: false, surveyPot: false })

    const surveyDetails = {
        surveyPot: "I'm a designer looking to share my work",
        surveyMixer: "I'm looking to hire a designer",
        surveyEye: "I'm looking for design inspiration"
    }

    useEffect(() => {
        const currUser = JSON.parse(sessionStorage.getItem('user'))
        if (!currUser) {
            navigate("/")
        }
        else {
            setCurrUser(currUser)
        }
        console.log(currUser, 'user')
    }, [])

    const handleClick = (e) => {
        setClick({ ...survey, [e.target.id]: !survey[e.target.id] })
        console.log(survey, "survey")
        console.log(e.target, "target")
        console.log(e.target.id, "id")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const finalSurvey = Object.keys(survey).filter(key => survey[key])
        console.log(finalSurvey, "finalSurvey")
        // e.preventDefault()
        // fetch('http://localhost:5000/api/completeProfile/surney', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(survey)
    }


    return (
        <div>
            <Navbar
                back={true}
                backLink='/completeProfile'
                username={currUser.message && currUser.message.username}
                onClick={() => navigate('/completeProfile')}
            />
            <div className="px-2 sm:w-8/12 lg:w-8/12 m-auto flex flex-col gap-5 sm:gap-5 lg:gap-6 xl:gap-8 3xl:gap-11">
                <div className='flex flex-col gap-1 sm:gap-2 lg:gap-2 xl:gap-3 2xl:gap-4 3xl:gap-7 text-center'>
                    <h1 className='text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold'>
                        What brings you to Dribbble?
                    </h1>
                    <p className='text-[#919191] text-xs sm:text-base lg:text-lg font-medium'>
                        Select the options that best describe you. Don't worry, you can explore other options later.
                    </p>
                </div>
                <form action="" className="w-full flex flex-col gap-6">

                    <div onSubmit={handleSubmit} className="w-full flex justify-center xl:py-8 3xl:py-16 text-left gap-7 sm:gap-5 lg:gap-6 xl:gap-8 3xl:gap-11">

                        <div className={`border-[#f1f1f1] border-2 rounded-xl h-80 p-6 text-center ${survey.surveyPot === "surveyPot" && "border-pink-500"}`}>
                            <div className={`${survey.surveyPot && "-translate-y-20  "}`}>
                                <img src={surveyPot} alt="" className="w-56 m-auto mb-7 duration" />
                                <h1 className="font-bold text-xl w-64 mb-2 ">
                                    I'm a designer looking to share my work
                                </h1>
                                {
                                    survey.surveyPot && <p className="w-64 text-sm text-[#818181] font-medium">
                                        With over 7 million shots from a vast community of designers, Dribbble is the world leading source for design inspiration.
                                    </p>
                                }
                                <div className={`h-9 w-9 bg-white border-[#b1b1b1] border-2 m-auto rounded-full ${survey.surveyPot && "bg-[#000000]"} z-10`} onClick={handleClick} id="surveyPot">
                                    <TiTick className={`m-auto ${!survey.surveyPot && "hidden"}`} onClick={handleClick} id="surveyPot" color="#ffffff" size={30} />
                                </div>
                            </div>
                        </div>

                        <div className={`border-[#f1f1f1] border-2 rounded-xl h-80 p-6 text-center ${survey.surveyMixer === "surveyMixer" && "border-pink-500"}`}>
                            <div className={`${survey.surveyMixer && "-translate-y-20  "}`}>
                                <img src={surveyMixer} alt="" className="w-56 m-auto mb-7 duration" />
                                <h1 className="font-bold text-xl w-64 mb-2 ">
                                    I'm looking to hire a designer
                                </h1>
                                {
                                    survey.surveyMixer && <p className="w-64 text-sm text-[#818181] font-medium">
                                        With over 7 million shots from a vast community of designers, Dribbble is the world leading source for design inspiration.
                                    </p>
                                }
                                <div className={`h-9 w-9 bg-white border-[#b1b1b1] border-2 m-auto rounded-full ${survey.surveyMixer && "bg-[#000000]"} z-10`} onClick={handleClick} id="surveyMixer">
                                    <TiTick className={`m-auto ${!survey.surveyMixer && "hidden"}`} onClick={handleClick} id="surveyMixer" color="#ffffff" size={30} />
                                </div>
                            </div>
                        </div>

                        <div className={`border-[#f1f1f1] border-2 rounded-xl h-80 p-6 text-center ${survey.surveyEye === "surveyEye" && "border-pink-500"}`}>
                            <div className={`${survey.surveyEye && "-translate-y-20  "}`}>
                                <img src={surveyEye} alt="" className="w-56 m-auto mb-7 duration" />
                                <h1 className="font-bold text-xl w-64 mb-2 ">
                                    I'm looking for design inspiration
                                </h1>
                                {
                                    survey.surveyEye && <p className="w-64 text-sm text-[#818181] font-medium">
                                        With over 7 million shots from a vast community of designers, Dribbble is the world leading source for design inspiration.
                                    </p>
                                }
                                <div className={`h-9 w-9 bg-white border-[#b1b1b1] border-2 m-auto rounded-full ${survey.surveyEye && "bg-[#000000]"} z-10`} onClick={handleClick} id="surveyEye">
                                    <TiTick className={`m-auto ${!survey.surveyEye && "hidden"}`} onClick={handleClick} id="surveyEye" color="#ffffff" size={30} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="m-auto w-fit text-xs sm:text-base lg:text-lg font-medium">
                        Anything else? You can select multiple
                    </p>
                    <button className='bg-[#ea4b8b] w-1/5 m-auto hover:bg-[#e42c76] duration-150 rounded-lg p-3 text-white focus:outline-none font-semibold' onClick={handleSubmit}>
                        Finish
                    </button>
                    <p className="text-[#919191] m-auto w-fit text-xs sm:text-base lg:text-lg font-medium">
                        or Press Return
                    </p>

                </form>

            </div>
        </div>
    )
}