const API_BASE = "http://127.0.0.1:8000";

export async function generateBlueprint(pdfPath: string) {
    const response = await fetch(
        `${API_BASE}/generate-blueprint`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pdf_path: pdfPath,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Blueprint generation failed.");
    }

    return response.json();
}

export async function generateCase(
    sessionId: string,
    blueprint: any
) {
    const response = await fetch(
        `${API_BASE}/generate-case`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                session_id: sessionId,
                blueprint,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Case generation failed.");
    }

    return response.json();
}

export async function patientChat(
    sessionId: string,
    question: string
) {
    const response = await fetch(
        `${API_BASE}/patient-chat`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                session_id: sessionId,
                question,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Patient chat failed.");
    }

    return response.json();
}