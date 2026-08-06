import Marquee from "@/pages/home/components/Marquee";

const categories = [
  "Math Tutors",
  "English Tutors",
  "Science Tutors",
  "University Prep",
  "Spoken English",
  "Coding Mentors",
  "Exam Coaching",
  "Music Tutors",
  "Physics Tutors",
];

const TuitionCategory = () => {
  return (
    <section className="bg-brand-800">
      <Marquee marqueeItems={categories} />
    </section>
  );
};

export default TuitionCategory;
