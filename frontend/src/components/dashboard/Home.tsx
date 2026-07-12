import { motion, AnimatePresence } from 'motion/react';
import { DashboardView } from '../../types';
import {
  Play,
  TrendingUp,
  CheckCircle,
  UploadCloud,
  FileText,
  Activity,
  Brain
} from 'lucide-react';

import { useState, useRef, useEffect } from "react";


export function Home({
  onViewChange,
  sessionState,
  setSessionState
}: {
  onViewChange: (view: DashboardView) => void,
  sessionState: 'waiting' | 'analyzing' | 'preparing' | 'ready',
  setSessionState: (
    state: 'waiting' | 'analyzing' | 'preparing' | 'ready'
  ) => void
}) {


  const [uploadProgress, setUploadProgress] = useState(0);


  const [progress, setProgress] = useState({
    casesCompleted: 0,
    averageScore: 0,
    reasoning: 0,
    history: 0,
  });


  const fileInputRef = useRef<HTMLInputElement>(null);



  useEffect(() => {

    const saved = localStorage.getItem(
      "learning_progress"
    );

    if(saved){
      setProgress(JSON.parse(saved));
    }

  }, []);




  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {


    const file = e.target.files?.[0];


    if(!file) return;



    setSessionState("analyzing");


    try {


      // ============================
      // STEP 1: Upload PDF
      // ============================


      const formData = new FormData();

      formData.append(
        "pdf",
        file
      );


      const blueprintResponse = await fetch(
        "http://localhost:8000/generate-blueprint",
        {
          method: "POST",
          body: formData,
        }
      );



      if(!blueprintResponse.ok){

        console.log(
          await blueprintResponse.text()
        );

        throw new Error(
          "Blueprint generation failed"
        );

      }



      const blueprintData =
        await blueprintResponse.json();



      console.log(
        "Blueprint:",
        blueprintData
      );



      localStorage.setItem(
        "session_id",
        blueprintData.session_id
      );


      localStorage.setItem(
        "blueprint",
        JSON.stringify(
          blueprintData.blueprint
        )
      );



      setUploadProgress(1);



      // ============================
      // STEP 2: Generate Patient Case
      // ============================


      setSessionState(
        "preparing"
      );



      const caseResponse =
        await fetch(
          "http://localhost:8000/generate-case",
          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json",
            },


            body:JSON.stringify({

              session_id:
              blueprintData.session_id,


              blueprint:
              blueprintData.blueprint,

            }),

          }
        );



      if(!caseResponse.ok){

        console.log(
          await caseResponse.text()
        );

        throw new Error(
          "Case generation failed"
        );

      }




      const patientCase =
        await caseResponse.json();



      console.log(
        "Patient Case:",
        patientCase
      );



      localStorage.setItem(
        "patient_case",
        JSON.stringify(
          patientCase
        )
      );



      setUploadProgress(4);



      setSessionState(
        "ready"
      );



    }


    catch(err){


      console.error(
        "FULL ERROR:",
        err
      );


      setSessionState(
        "waiting"
      );

    }

  };





  return (

    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">


      <header>


        <input

          ref={fileInputRef}

          type="file"

          accept=".pdf"

          hidden

          onChange={handleUpload}

        />



        <h1 className="text-3xl font-bold text-text-main mb-2">

          Welcome back.

        </h1>


        <p className="text-text-muted text-lg">

          Upload your lecture notes to begin your next clinical learning session.

        </p>


      </header>





      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">


        <AnimatePresence mode="wait">



          {
          sessionState === "waiting" &&

          <motion.div

          key="upload"

          initial={{opacity:0,y:10}}

          animate={{opacity:1,y:0}}

          className="flex flex-col items-center justify-center py-8 text-center"

          >


            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">

              <UploadCloud className="w-8 h-8"/>

            </div>



            <h2 className="text-2xl font-bold mb-2">

              Upload Lecture Notes

            </h2>



            <p className="text-text-muted mb-8">

              Transform your lecture into an AI-powered clinical simulation.

            </p>



            <button

              onClick={() =>
                fileInputRef.current?.click()
              }

              className="px-8 py-3 bg-primary text-white rounded-xl"

            >

              Choose PDF

            </button>


          </motion.div>

          }





          {
          (sessionState==="analyzing" ||
          sessionState==="preparing")

          &&


          <motion.div

          key="processing"

          initial={{opacity:0}}

          animate={{opacity:1}}

          >


            <div className="flex items-center gap-4 mb-8">

              <FileText className="w-8 h-8 text-primary"/>


              <div>

                <h3 className="font-bold">

                  Processing lecture

                </h3>


                <p className="text-sm text-text-muted">

                  Creating personalized clinical case...

                </p>


              </div>


            </div>




            <div className="space-y-4">


              <ProgressStep
                label="Reading lecture"
                completed={uploadProgress>=1}
                active={uploadProgress===0}
              />


              <ProgressStep
                label="Understanding concepts"
                completed={uploadProgress>=2}
                active={uploadProgress===1}
              />


              <ProgressStep
                label="Building clinical scenario"
                completed={uploadProgress>=3}
                active={uploadProgress===2}
              />


              <ProgressStep
                label="Preparing AI patient"
                completed={uploadProgress>=4}
                active={uploadProgress===3}
              />


            </div>


          </motion.div>

          }






          {
          sessionState==="ready" &&


          <motion.div

          key="ready"

          initial={{opacity:0}}

          animate={{opacity:1}}

          >


            <span className="text-xs font-bold text-green-600">

              TODAY'S SESSION

            </span>



            <h2 className="text-2xl font-bold mt-3">

              Heart Failure Exacerbation

            </h2>




            <button

            onClick={() =>
              onViewChange("encounter")
            }

            className="mt-6 px-6 py-3 bg-primary text-white rounded-xl flex items-center gap-2"

            >

              <Play className="w-5 h-5"/>

              Start Clinical Encounter


            </button>


          </motion.div>

          }




        </AnimatePresence>


      </div>





      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


        <StatCard

        title="Cases Completed"

        value={progress.casesCompleted.toString()}

        icon={<CheckCircle/>}

        />


        <StatCard

        title="Average Score"

        value={`${progress.averageScore}%`}

        icon={<TrendingUp/>}

        />


        <StatCard

        title="Clinical Reasoning"

        value={`${progress.reasoning}%`}

        icon={<Brain/>}

        />


        <StatCard

        title="History Taking"

        value={`${progress.history}%`}

        icon={<Activity/>}

        />


      </div>



    </div>

  );

}





function ProgressStep({
label,
completed,
active
}:{
label:string;
completed:boolean;
active:boolean;
}){


return (

<div className="flex items-center gap-3">


<div

className={`w-5 h-5 rounded-full ${
completed
? "bg-green-500"
: active
? "bg-primary animate-pulse"
: "bg-gray-200"
}`}

>


</div>



<span>

{label}

</span>


</div>

)

}






function StatCard({
title,
value,
icon
}:{
title:string;
value:string;
icon:React.ReactNode;
}){


return (

<div className="bg-white rounded-2xl p-5 border">

<div className="flex justify-between">

<p>

{title}

</p>


{icon}


</div>


<h3 className="text-3xl font-bold">

{value}

</h3>


</div>

)

}