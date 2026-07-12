import { useEffect, useState } from "react";

export function Flashcards() {

    const [deck, setDeck] = useState<any>(null);

    const [index, setIndex] = useState(0);

    const [showBack, setShowBack] = useState(false);

    useEffect(() => {

        const saved = localStorage.getItem(
            "flashcards"
        );

        if (saved) {

            setDeck(JSON.parse(saved));

        }

    }, []);

    if (!deck) {

        return <div className="p-8">Loading...</div>;

    }

    const card = deck.flashcards[index];

    return (

        <div className="max-w-3xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">

                {deck.title}

            </h1>

            <div

                onClick={() => setShowBack(!showBack)}

                className="cursor-pointer bg-white rounded-3xl shadow-lg p-12 min-h-[300px] flex items-center justify-center text-center transition"

            >

                <div>

                    <div className="text-sm text-gray-500 mb-6">

                        Card {index + 1} / {deck.flashcards.length}

                    </div>

                    <h2 className="text-2xl font-semibold">

                        {showBack

                            ? card.back

                            : card.front}

                    </h2>

                </div>

            </div>

            <div className="flex justify-between mt-8">

                <button

                    disabled={index===0}

                    onClick={() => {

                        setShowBack(false);

                        setIndex(index-1);

                    }}

                >

                    Previous

                </button>

                <button

                    disabled={index===deck.flashcards.length-1}

                    onClick={() => {

                        setShowBack(false);

                        setIndex(index+1);

                    }}

                >

                    Next

                </button>

            </div>

        </div>

    );

}