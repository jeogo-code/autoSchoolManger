1. Client Schema
   The client schema represents the structure for storing client information.

javascript
Copy code
const clientSchema = {
  _id: 'client_<unique_id>', // Unique identifier for each client
  type: 'client', // Document type
  name: '', // Full name
  photo: '', // Path to the client's photo
  registrationDate: '', // Date of registration
  phone: '', // Phone number
  identifier: '', // Identifier (e.g., national ID)
  gender: '', // Gender
  prenom_fr: '', // First name in French
  nom: '', // Last name
  nom_fr: '', // Last name in French
  date_naissance: '', // Date of birth
  unknown_birth_date: false, // Boolean indicating if the birth date is unknown
  place_naissance: '', // Place of birth
  blood_type: '', // Blood type
  id_card_number: '', // ID card number
  adresse: '', // Address
  groupId: '', // Group ID (if any)
  paymentAmount: '', // Payment amount
  isFullyPaid: false, // Boolean indicating if the payment is fully paid
};
2. Group Schema
The group schema represents the structure for storing group information.

javascript
Copy code
const groupSchema = {
  _id: 'group_<unique_id>', // Unique identifier for each group
  type: 'group', // Document type
  name: '', // Group name
  clientIds: [], // Array of client IDs associated with the group
};
3. Lesson Schema
The lesson schema represents the structure for storing lesson information.

javascript
const lessonSchema = {
  _id: 'lesson_<unique_id>', // Unique identifier for each lesson
  type: 'lesson', // Document type
  clientID: '', // ID of the client associated with the lesson
  date: '', // Date of the lesson
  time: '', // Time of the lesson
  lessons: [], // Array of lesson names or topics covered
};
