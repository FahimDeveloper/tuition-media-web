import type { CSSProperties, MouseEventHandler } from "react";
import { useEffect, useMemo, useState } from "react";
import { Carousel } from "antd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TeacherProfileCard, {
  type TeacherProfile,
} from "@/components/layout/home/featuredTeacher/TeacherProfileCard";
import "@/components/layout/home/featuredTeacher/featuredTeacher.css";

type CardsPerSlide = 1 | 2 | 3;
type ArrowDirection = "previous" | "next";

const BREAKPOINTS = {
  tablet: 640,
  desktop: 1024,
} as const;

const GRID_CLASS_BY_CARDS: Record<CardsPerSlide, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

const ARROW_CLASS_NAME = "featured-teacher-arrow";

const FEATURED_TEACHERS: TeacherProfile[] = [
  {
    id: "t-1",
    name: "Farhana Rahman",
    title: "Math & Physics Tutor",
    location: "Dhanmondi, Dhaka",
    subjects: ["HSC Math", "Physics", "ICT"],
    rating: 4.9,
    experienceYears: 8,
    hourlyRate: 1200,
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isVerified: true,
  },
  {
    id: "t-2",
    name: "Tanvir Hasan",
    title: "English & IELTS Mentor",
    location: "Mirpur, Dhaka",
    subjects: ["Spoken English", "IELTS", "A-Level English"],
    rating: 4.8,
    experienceYears: 6,
    hourlyRate: 1000,
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isVerified: true,
  },
  {
    id: "t-3",
    name: "Samia Akter",
    title: "Biology Specialist",
    location: "Uttara, Dhaka",
    subjects: ["Biology", "Science", "Admission Prep"],
    rating: 4.9,
    experienceYears: 7,
    hourlyRate: 1100,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isVerified: true,
  },
  {
    id: "t-4",
    name: "Muntasir Alam",
    title: "Chemistry Tutor",
    location: "Bashundhara, Dhaka",
    subjects: ["Chemistry", "O-Level Science", "Lab Prep"],
    rating: 4.7,
    experienceYears: 5,
    hourlyRate: 900,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isVerified: false,
  },
  {
    id: "t-5",
    name: "Nusrat Jahan",
    title: "Primary All-Subject Tutor",
    location: "Mohammadpur, Dhaka",
    subjects: ["Bangla", "English", "Math"],
    rating: 4.8,
    experienceYears: 9,
    hourlyRate: 800,
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isVerified: true,
  },
  {
    id: "t-6",
    name: "Sajid Karim",
    title: "Higher Math Instructor",
    location: "Banani, Dhaka",
    subjects: ["Higher Math", "SAT Math", "University Prep"],
    rating: 4.9,
    experienceYears: 10,
    hourlyRate: 1500,
    avatarUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isVerified: true,
  },
];

const resolveCardsPerSlide = (viewportWidth: number): CardsPerSlide => {
  if (viewportWidth >= BREAKPOINTS.desktop) {
    return 3;
  }

  if (viewportWidth >= BREAKPOINTS.tablet) {
    return 2;
  }

  return 1;
};

const getInitialCardsPerSlide = (): CardsPerSlide => {
  if (typeof window === "undefined") {
    return 1;
  }

  return resolveCardsPerSlide(window.innerWidth);
};

const splitTeachersBySlide = (
  teachers: TeacherProfile[],
  cardsPerSlide: CardsPerSlide,
): TeacherProfile[][] => {
  const groupedTeachers: TeacherProfile[][] = [];

  for (let index = 0; index < teachers.length; index += cardsPerSlide) {
    groupedTeachers.push(teachers.slice(index, index + cardsPerSlide));
  }

  return groupedTeachers;
};

const useCardsPerSlide = (): CardsPerSlide => {
  const [cardsPerSlide, setCardsPerSlide] = useState<CardsPerSlide>(
    getInitialCardsPerSlide,
  );

  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(resolveCardsPerSlide(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return cardsPerSlide;
};

type CarouselArrowProps = {
  className?: string;
  direction: ArrowDirection;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
};

const CarouselArrow = ({
  className,
  direction,
  onClick,
  style,
}: CarouselArrowProps) => {
  const isPreviousArrow = direction === "previous";

  return (
    <button
      type="button"
      aria-label={
        isPreviousArrow
          ? "Previous featured teachers"
          : "Next featured teachers"
      }
      className={`${ARROW_CLASS_NAME} ${className ?? ""}`}
      onClick={onClick}
      style={style}
    >
      {isPreviousArrow ? (
        <FiChevronLeft size={18} />
      ) : (
        <FiChevronRight size={18} />
      )}
    </button>
  );
};

const FeaturedTeacherCarousel = () => {
  const cardsPerSlide = useCardsPerSlide();

  const teachersBySlide = useMemo(
    () => splitTeachersBySlide(FEATURED_TEACHERS, cardsPerSlide),
    [cardsPerSlide],
  );

  const slideGridClasses = GRID_CLASS_BY_CARDS[cardsPerSlide];

  return (
    <div className="featured-teacher-carousel">
      <Carousel
        arrows
        infinite
        draggable
        dots
        prevArrow={<CarouselArrow direction="previous" />}
        nextArrow={<CarouselArrow direction="next" />}
      >
        {teachersBySlide.map((teachersInSlide, slideIndex) => (
          <div
            key={`featured-teacher-slide-${slideIndex}`}
            className="px-1 py-1"
          >
            <div className={`grid ${slideGridClasses} gap-5`}>
              {teachersInSlide.map((teacher) => (
                <div key={teacher.id} className="h-full py-6">
                  <TeacherProfileCard teacher={teacher} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedTeacherCarousel;
