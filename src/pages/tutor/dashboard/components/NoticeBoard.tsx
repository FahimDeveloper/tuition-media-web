import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { MdArrowRightAlt, MdNotificationsNone } from "react-icons/md";

export type NoticeItem = {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
};

export type NoticeCarouselProps = {
  notices: NoticeItem[];
  autoplay?: boolean;
  action?: {
    label: string;
    to: string;
  };
  className?: string;
};

export default function NoticeCarousel({
  notices,
  autoplay = true,
  action,
  className = "",
}: NoticeCarouselProps) {
  return (
    <article
      className={`border-border bg-surface-elevated shadow-theme-sm rounded-2xl border p-5 sm:p-6 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-50 text-brand-600 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1">
            <MdNotificationsNone className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-text-strong text-base font-semibold sm:text-lg">
              Notice Board
            </h2>
            <p className="text-text-muted text-sm">Latest announcements</p>
          </div>
        </div>

        {action ? (
          <Link
            to={action.to}
            className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200 inline-flex shrink-0 items-center gap-1.5 rounded-full text-sm font-semibold transition-colors"
          >
            <span>{action.label}</span>
            <MdArrowRightAlt className="h-5 w-5" />
          </Link>
        ) : null}
      </div>

      {notices.length > 0 ? (
        <Carousel
          autoplay={autoplay}
          dots={false}
          draggable
          swipe
          autoplaySpeed={4000}
        >
          {notices.map((notice) => (
            <div key={notice.id}>
              <div className="rounded-xl px-1">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <h3 className="text-text-strong line-clamp-1 text-base font-semibold">
                    {notice.title}
                  </h3>

                  {notice.date ? (
                    <span className="text-text-muted shrink-0 pt-0.5 text-xs">
                      {notice.date}
                    </span>
                  ) : null}
                </div>

                {notice.description ? (
                  <p className="text-text-muted line-clamp-3 text-sm leading-6">
                    {notice.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="border-border rounded-xl border border-dashed p-5 text-center">
          <p className="text-text-muted text-sm">No notices available.</p>
        </div>
      )}
    </article>
  );
}
