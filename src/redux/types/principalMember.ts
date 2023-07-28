export interface IPrincipalMemember{
    full_names: string,
    surname: string,
    country: 'none',
    residence_country?: string,
    id_number: string,
    passport: string,
    date_of_birth: string,
    gender: string,
    birth_country: string,
    risk_status: string,
    termination_date: string,
    contact_number: string,
    address: string,
    error?: null, // Initialize the error property to null
}