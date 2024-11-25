export interface Instructor {
  instructor_id: string;
  name: string;
}

export interface Subject {
  thumbnail: string;
  title: string;
}

export interface Session {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  meeting_link: string | null;
  instructor: Instructor;
  subject: Subject;
}
