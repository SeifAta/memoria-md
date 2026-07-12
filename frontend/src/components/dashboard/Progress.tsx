import { useEffect, useState } from "react";

export function Progress() {
    const [progress, setProgress] = useState({
        casesCompleted: 0,
        averageScore: 0,
        reasoning: 0,
        history: 0,
    });

    useEffect(() => {
        const saved = localStorage.getItem("learning_progress");

        if (saved) {
            setProgress(JSON.parse(saved));
        }
    }, []);

    const differential = Math.max(
        60,
        progress.reasoning - 8
    );

    const management = Math.min(
        100,
        progress.averageScore + 5
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Learning Progress
                </h1>

                <p className="text-gray-500 mt-2">
                    Track your clinical performance across all MemoriaMD sessions.
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-5">

                <StatCard
                    title="Cases Completed"
                    value={progress.casesCompleted.toString()}
                />

                <StatCard
                    title="Average Score"
                    value={`${progress.averageScore}%`}
                />

                <StatCard
                    title="Clinical Reasoning"
                    value={`${progress.reasoning}%`}
                />

                <StatCard
                    title="History Taking"
                    value={`${progress.history}%`}
                />

            </div>

            <div className="bg-white rounded-2xl p-8 shadow">

                <h2 className="text-xl font-bold mb-6">
                    Performance Breakdown
                </h2>

                <ProgressBar
                    label="History Taking"
                    value={progress.history}
                />

                <ProgressBar
                    label="Clinical Reasoning"
                    value={progress.reasoning}
                />

                <ProgressBar
                    label="Differential Diagnosis"
                    value={differential}
                />

                <ProgressBar
                    label="Management"
                    value={management}
                />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl p-8 shadow">

                    <h2 className="text-xl font-bold mb-4">
                        Achievements
                    </h2>

                    <div className="space-y-3">

                        <Achievement
                            text="Completed your first AI clinical encounter"
                        />

                        <Achievement
                            text="Finished an AI review session"
                        />

                        {progress.averageScore >= 80 && (
                            <Achievement
                                text="Scored above 80%"
                            />
                        )}

                    </div>

                </div>

                <div className="bg-white rounded-2xl p-8 shadow">

                    <h2 className="text-xl font-bold mb-4">
                        Focus Areas
                    </h2>

                    <ul className="space-y-3 text-gray-600">

                        <li>• Differential diagnosis</li>

                        <li>• Management planning</li>

                        <li>• Patient communication</li>

                    </ul>

                </div>

            </div>

        </div>
    );
}

function StatCard({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <h2 className="text-4xl font-bold mt-3">
                {value}
            </h2>

        </div>
    );
}

function ProgressBar({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="mb-6">

            <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

            </div>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                        width: `${value}%`,
                    }}
                />

            </div>

        </div>
    );
}

function Achievement({
    text,
}: {
    text: string;
}) {
    return (
        <div className="rounded-xl bg-green-50 p-4">

            🏅 {text}

        </div>
    );
}