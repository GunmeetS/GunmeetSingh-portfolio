"use client";

import { useState,useEffect  } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FiGithub, FiX, FiChevronLeft, FiChevronRight } from "@/components/Icons";
import { SlideUp, SlideLeft, SlideRight } from "@/components/ScrollAnimation";

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);

    useEffect(() => {
    import('slick-carousel/slick/slick.css')
    import('slick-carousel/slick/slick-theme.css')
  }, [])

  const projects = [
    {
      id: 1,
      title: "GMS Finance Platform",
      description:
      "Finance App built with Next.js featuring role-based authentication. The app allows users to add lendees, manage EMI schedules, make payments, and offers many other features for financial management.",
      images: [
        "/images/projects/gms-1.png",
        "/images/projects/gms-2.png",
        "/images/projects/gms-3.png",
        "/images/projects/gms-4.png",
      ],
      tech: ["Next.js", "MySQL", "Prisma", "Tailwind"],
    },
    {
      id: 2,
      title: "CRM Management Dashboard",
      description:
        "CRM Application built with Laravel, allowing customers to select social media accounts and choose CMS services for managing their digital presence. The app includes features like invoice generation, the ability to view monthly statistics, ticket management for support, and much more.",
      images: [
        "/images/projects/crm-1.png",
        "/images/projects/crm-2.png",
        "/images/projects/crm-3.png",
        "/images/projects/crm-4.png",
      ],
      tech: ["Laravel", "MySQL", "Bootstrap"],
    },
    {
      id: 3,
      title: "Scheduler App",
      description:
        "Scheduler App built with Next.js allows users to schedule and manage appointments. It includes features like real-time availability updates, customizable booking options, and payment integration with Stripe for secure transactions.",
      images: [
        "/images/projects/scheduler-2.png",
        "/images/projects/scheduler-3.png",
        "/images/projects/scheduler-4.png",
        "/images/projects/scheduler-5.png",
        "/images/projects/scheduler-1.png",
      ],
      tech: ["Next.js", "MongoDB", "Prisma", "Tailwind"],
    },
    {
      id: 4,
      title: "ReviewHub",
      description:
        "A full-featured review platform where users can rate, write, and browse reviews with real-time feedback and secure authentication. Built with Next.js and MySQL, the app features responsive design, intuitive filtering, and admin moderation tools.",
      images: [
        "/images/projects/review-1.png",
        "/images/projects/review-2.png",
        "/images/projects/review-3.png",
        "/images/projects/review-4.png",
        "/images/projects/review-5.png",
      ],
      tech: ["Next.js", "MySQL", "Prisma", "Tailwind"],
    },
  ];

  const carouselCardSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    adaptiveHeight: true,
    arrows: false,
  };

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 hover:bg-teal-600 dark:hover:bg-teal-600 text-gray-800 dark:text-white hover:text-white rounded-full p-2 sm:p-3 shadow-lg transition-all transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      aria-label="Next slide"
    >
      <FiChevronRight size={20} className="sm:w-6 sm:h-6" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 hover:bg-teal-600 dark:hover:bg-teal-600 text-gray-800 dark:text-white hover:text-white rounded-full p-2 sm:p-3 shadow-lg transition-all transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      aria-label="Previous slide"
    >
      <FiChevronLeft size={20} className="sm:w-6 sm:h-6" />
    </button>
  );

  const carouselModalSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-cream-100 dark:bg-charcoal-900"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SlideUp>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white"
          >
            Featured Projects
          </h2>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => {
            const AnimationComponent = index % 2 === 0 ? SlideLeft : SlideRight;
            return (
              <AnimationComponent key={project.id} delay={index * 0.2}>
                <article
                  onClick={() => openModal(project)}
                  onKeyDown={(e) => e.key === "Enter" && openModal(project)}
                  tabIndex={0}
                  aria-labelledby={`project-title-${project.id}`}
                  className="bg-white dark:bg-charcoal-800 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-teal-500 cursor-pointer outline-none"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden rounded-t-lg">
                    <Slider
                      {...carouselCardSettings}
                      aria-label={`${project.title} screenshots carousel`}
                    >
                      {project.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="h-48 sm:h-56 md:h-64 relative select-none pointer-events-none"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                            draggable={false}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <div className="p-4 sm:p-5 md:p-6">
                    <h3
                      id={`project-title-${project.id}`}
                      className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white"
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div
                      className="flex flex-wrap gap-2 mb-3 sm:mb-4"
                      aria-label="Technologies used"
                    >
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-semibold rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                        aria-label={`View source code of ${project.title} on GitHub`}
                      >
                        <FiGithub size={20} aria-hidden="true" />
                        View Code
                      </a>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded cursor-default">
                        Private Project
                      </span>
                    )}
                  </div>
                </article>
              </AnimationComponent>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          onClick={closeModal}
          className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4 md:pt-24 pt-12 overflow-auto"
          style={{ isolation: 'isolate' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-charcoal-800 rounded-lg sm:rounded-xl max-w-5xl w-full max-h-[90vh] shadow-2xl relative my-auto"
          >
            <header className="bg-white dark:bg-charcoal-800 p-4 sm:p-5 md:p-6 border-b border-gray-300 dark:border-gray-700 flex justify-between items-start gap-4 rounded-t-lg sm:rounded-t-xl">
              <h3
                id="modal-title"
                className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white pr-8"
              >
                {modalProject.title}
              </h3>
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="absolute right-4 top-4 sm:right-5 sm:top-5 md:right-6 md:top-6 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-all"
              >
                <FiX size={24} className="sm:w-7 sm:h-7" />
              </button>
            </header>

            <div className="p-4 sm:p-5 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Image Carousel */}
              <div className="mb-4 sm:mb-6 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                <Slider
                  {...carouselModalSettings}
                  aria-label={`${modalProject.title} larger screenshots carousel`}
                >
                  {modalProject.images.map((img, idx) => (
                    <div key={idx} className="relative w-full">
                      <Image
                        src={img}
                        alt={`${modalProject.title} screenshot ${idx + 1}`}
                        width={1920}
                        height={1280}
                        className="w-full h-auto object-contain"
                        priority={idx === 0}
                        draggable={false}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                {modalProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {modalProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {modalProject.github && (
                <a
                  href={modalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-teal-600 dark:hover:bg-teal-600 transition-all font-semibold text-sm sm:text-base"
                >
                  <FiGithub size={20} />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
