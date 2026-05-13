import type { CSSProperties, MouseEventHandler } from "react";
import { useEffect, useMemo, useState } from "react";
import { Carousel } from "antd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TeacherProfileCard from "@/pages/home/featured-teacher-section/TeacherProfileCard";
import type { FeaturedTeacherViewModel } from "@/types";
import "@/pages/home/featured-teacher-section/featuredTeacher.css";

type CardsPerSlide = 1 | 2 | 3;
type ArrowDirection = "previous" | "next";
type FeaturedTeacherCarouselProps = {
  teachers: FeaturedTeacherViewModel[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

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
  teachers: FeaturedTeacherViewModel[],
  cardsPerSlide: CardsPerSlide,
): FeaturedTeacherViewModel[][] => {
  const groupedTeachers: FeaturedTeacherViewModel[][] = [];

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

const FeaturedTeacherCarouselState = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border rounded-2xl border px-6 py-10 text-center">
    <h3 className="font-poppins text-text-strong text-xl font-bold">{title}</h3>
    {description ? (
      <p className="text-text-muted mx-auto mt-3 max-w-md text-sm leading-6">
        {description}
      </p>
    ) : null}
  </div>
);

const FeaturedTeacherCarousel = ({
  teachers,
  isLoading = false,
  isError = false,
  errorMessage = "",
}: FeaturedTeacherCarouselProps) => {
  const cardsPerSlide = useCardsPerSlide();

  const teachersBySlide = useMemo(
    () => splitTeachersBySlide(teachers, cardsPerSlide),
    [cardsPerSlide, teachers],
  );

  const slideGridClasses = GRID_CLASS_BY_CARDS[cardsPerSlide];
  const hasMultipleSlides = teachersBySlide.length > 1;

  if (isLoading) {
    return (
      <FeaturedTeacherCarouselState title="Loading featured teachers..." />
    );
  }

  if (isError) {
    return (
      <FeaturedTeacherCarouselState
        title="Unable to load featured teachers"
        description={
          errorMessage ||
          "Please try again later. Featured teachers could not be loaded."
        }
      />
    );
  }

  if (teachers.length === 0) {
    return (
      <FeaturedTeacherCarouselState
        title="No featured teachers found"
        description="Featured teacher profiles will appear here when they are available."
      />
    );
  }

  return (
    <div className="featured-teacher-carousel">
      <Carousel
        arrows={hasMultipleSlides}
        infinite={hasMultipleSlides}
        draggable
        dots={hasMultipleSlides}
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
