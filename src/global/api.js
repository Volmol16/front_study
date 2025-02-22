const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUniversities = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/universities/`);
  return await response.json();
};

export const getFaculties = async (universityId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/faculties/?university_id=${universityId}`
  );
  return await response.json();
};

export const getDepartments = async (facultyId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/departments/?faculty_id=${facultyId}`
  );
  return await response.json();
};

export const getEducationForms = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/education-forms/`);
  return await response.json();
};

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
