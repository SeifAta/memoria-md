import { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Brain,
  Layers,
  Loader2,
  CheckCircle,
  XCircle
} from "lucide-react";


export function CustomStudy() {

  const [file, setFile] = useState<File | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [processing, setProcessing] = useState(false);

  const [loadingMCQ, setLoadingMCQ] = useState(false);

  const [loadingFlashcards, setLoadingFlashcards] = useState(false);


  const [mcqs, setMcqs] = useState<any[]>([]);

  const [flashcards, setFlashcards] = useState<any[]>([]);


  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});


  const [flippedCards, setFlippedCards] = useState<
    Record<number, boolean>
  >({});


  const fileInputRef = useRef<HTMLInputElement>(null);



  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selected = e.target.files?.[0];

    if(selected){

      setFile(selected);

      setSessionId(null);

      setMcqs([]);

      setFlashcards([]);

      setSelectedAnswers({});

      setFlippedCards({});

    }

  };






  const processLecture = async () => {


    if(!file){

      alert("Upload a PDF first");

      return;

    }



    try {

      setProcessing(true);


      const formData = new FormData();


      formData.append(
        "pdf",
        file
      );



      const response = await fetch(
        "http://localhost:8000/generate-blueprint",
        {
          method:"POST",
          body:formData
        }
      );



      if(!response.ok){

        console.log(
          await response.text()
        );

        throw new Error(
          "Blueprint generation failed"
        );

      }



      const data =
        await response.json();



      console.log(
        "Blueprint:",
        data
      );



      setSessionId(
        data.session_id
      );



      localStorage.setItem(
        "custom_study_session",
        data.session_id
      );


      localStorage.setItem(
        "custom_study_blueprint",
        JSON.stringify(
          data.blueprint
        )
      );



      alert(
        "Lecture processed successfully"
      );


    } catch(error){

      console.error(error);

      alert(
        "Failed processing lecture"
      );


    } finally {

      setProcessing(false);

    }

  };









  const generateMCQs = async () => {


    if(!sessionId){

      alert(
        "Process lecture first"
      );

      return;

    }



    try {


      setLoadingMCQ(true);



      const response = await fetch(
        "http://localhost:8000/generate-custom-mcqs",
        {

          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },


          body:JSON.stringify({
            session_id:sessionId
          })

        }
      );



      if(!response.ok){

        console.log(
          await response.text()
        );

        throw new Error(
          "MCQ generation failed"
        );

      }



      const data =
        await response.json();



      console.log(
        "MCQ DATA:",
        data
      );



      setMcqs(
        data.mcqs || []
      );



    } catch(error){

      console.error(error);

      alert(
        "Failed generating MCQs"
      );


    } finally {

      setLoadingMCQ(false);

    }

  };









  const generateFlashcards = async () => {


    if(!sessionId){

      alert(
        "Process lecture first"
      );

      return;

    }



    try {


      setLoadingFlashcards(true);



      const response = await fetch(
        "http://localhost:8000/generate-custom-flashcards",
        {

          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },


          body:JSON.stringify({
            session_id:sessionId
          })

        }
      );



      if(!response.ok){

        console.log(
          await response.text()
        );

        throw new Error(
          "Flashcard generation failed"
        );

      }



      const data =
        await response.json();



      console.log(
        "FLASHCARD DATA:",
        data
      );



      setFlashcards(
        data.flashcards || []
      );



    } catch(error){

      console.error(error);

      alert(
        "Failed generating flashcards"
      );


    } finally {

      setLoadingFlashcards(false);

    }

  };









  const selectAnswer = (
    questionIndex:number,
    answer:string
  ) => {


    if(selectedAnswers[questionIndex]) return;


    setSelectedAnswers({

      ...selectedAnswers,

      [questionIndex]:answer

    });


  };








  const toggleCard = (
    index:number
  ) => {


    setFlippedCards({

      ...flippedCards,

      [index]:
      !flippedCards[index]

    });


  };









  return (

    <div className="max-w-5xl mx-auto space-y-8">



      <header>

        <h1 className="text-3xl font-bold text-text-main">

          Custom Study

        </h1>


        <p className="text-text-muted mt-2">

          Upload your lecture notes and generate personalized study materials.

        </p>


      </header>









      <div className="bg-white rounded-3xl p-8 border shadow-sm">


        <input

          ref={fileInputRef}

          type="file"

          accept=".pdf"

          hidden

          onChange={handleFileChange}

        />



        <div className="flex flex-col items-center text-center">


          <UploadCloud className="w-12 h-12 text-primary mb-4"/>



          <h2 className="text-xl font-bold">

            Upload Lecture PDF

          </h2>



          <button

            onClick={() =>
              fileInputRef.current?.click()
            }

            className="mt-5 px-6 py-3 bg-gray-100 rounded-xl"

          >

            Choose PDF

          </button>



          {
            file &&

            <div className="mt-4 flex gap-2 items-center">

              <FileText className="w-4 h-4"/>

              {file.name}

            </div>

          }



          <button

            onClick={processLecture}

            disabled={!file || processing}

            className="mt-6 px-8 py-3 bg-primary text-white rounded-xl flex items-center gap-2 disabled:opacity-50"

          >

            {
              processing &&
              <Loader2 className="animate-spin"/>
            }


            {
              processing
              ?
              "Processing..."
              :
              "Process Lecture"
            }


          </button>



          {
            sessionId &&

            <p className="mt-4 text-green-600 font-medium">

              Lecture blueprint loaded ✓

            </p>

          }


        </div>


      </div>









      <div className="grid md:grid-cols-2 gap-6">


        <div className="bg-white rounded-3xl p-8 border shadow-sm">


          <Brain className="w-10 h-10 text-primary mb-4"/>


          <h2 className="text-xl font-bold">

            Clinical MCQs

          </h2>



          <button

            onClick={generateMCQs}

            disabled={!sessionId || loadingMCQ}

            className="mt-5 px-6 py-3 bg-primary text-white rounded-xl flex gap-2 items-center"

          >

            {
              loadingMCQ &&
              <Loader2 className="animate-spin"/>
            }

            Generate MCQs

          </button>


        </div>








        <div className="bg-white rounded-3xl p-8 border shadow-sm">


          <Layers className="w-10 h-10 text-primary mb-4"/>


          <h2 className="text-xl font-bold">

            Flashcards

          </h2>



          <button

            onClick={generateFlashcards}

            disabled={!sessionId || loadingFlashcards}

            className="mt-5 px-6 py-3 bg-primary text-white rounded-xl flex gap-2 items-center"

          >

            {
              loadingFlashcards &&
              <Loader2 className="animate-spin"/>
            }

            Generate Flashcards

          </button>


        </div>


      </div>









      {
        mcqs.length > 0 &&

        <div className="bg-white rounded-3xl p-8 border shadow-sm">


          <h2 className="text-2xl font-bold mb-6">

            Generated Clinical MCQs

          </h2>



          <div className="space-y-8">


          {
            mcqs.map(
              (mcq,index)=>{


                const selected =
                  selectedAnswers[index];


                const isCorrect =
                  selected === mcq.correct_answer;



                return (

                <div
                  key={index}
                  className="border rounded-xl p-5"
                >


                  <h3 className="font-bold mb-4">

                    {index+1}. {mcq.question}

                  </h3>





                  {
                    mcq.options.map(
                      (option:string)=>(


                      <button

                        key={option}

                        onClick={() =>
                          selectAnswer(
                            index,
                            option
                          )
                        }

                        className={`
                        block w-full text-left p-3 rounded-lg mb-2 border
                        ${
                          selected === option
                          ?
                          (
                            option === mcq.correct_answer
                            ?
                            "bg-green-100 border-green-500"
                            :
                            "bg-red-100 border-red-500"
                          )
                          :
                          "bg-gray-50"
                        }
                        `}

                      >

                        {option}

                      </button>


                      )
                    )
                  }






                  {
                    selected &&

                    <div className="mt-4">


                      {
                        isCorrect
                        ?

                        <p className="text-green-600 flex items-center gap-2">

                          <CheckCircle className="w-5 h-5"/>

                          Correct

                        </p>

                        :

                        <p className="text-red-600 flex items-center gap-2">

                          <XCircle className="w-5 h-5"/>

                          Incorrect

                        </p>

                      }



                      <p className="mt-3 text-sm text-text-muted">

                        <strong>
                        Explanation:
                        </strong>

                        {" "}

                        {mcq.explanation}

                      </p>


                    </div>

                  }


                </div>

                )

              }

            )

          }


          </div>


        </div>

      }









      {
        flashcards.length > 0 &&

        <div className="bg-white rounded-3xl p-8 border shadow-sm">


          <h2 className="text-2xl font-bold mb-6">

            Flashcards

          </h2>



          <div className="grid md:grid-cols-2 gap-5">


          {
            flashcards.map(
              (card,index)=>(


              <button

                key={index}

                onClick={() =>
                  toggleCard(index)
                }

                className="text-left border rounded-xl p-6 min-h-[160px] bg-gray-50"

              >


                {
                  flippedCards[index]

                  ?

                  <>

                  <h3 className="font-bold mb-3">

                    Answer

                  </h3>

                  <p>

                    {card.back}

                  </p>

                  </>


                  :

                  <>

                  <h3 className="font-bold mb-3">

                    Question

                  </h3>


                  <p>

                    {card.front}

                  </p>

                  </>


                }



              </button>


              )

            )

          }


          </div>


        </div>

      }



    </div>

  );

}