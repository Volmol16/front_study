const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUniversitiesForStudentCard = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/universities/${id}/`);
  return await response.json();
};

export const getFacultiesForStudentCard = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/faculties/${id}/`);
  return await response.json();
};

export const getDepartmentsForStudentCard = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/departments/${id}/`);
  return await response.json();
};

export const getDisciplinesForStudentCard = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/discipline/${id}/`);
  return await response.json();
};

export const postQuestionnaireAuditing = async (
  id,
  status,
  card_number,
  comment
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/student-card-verification/${id}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        student_card_number: card_number,
        comment: comment,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
