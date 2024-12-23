import Header from "./components/Header";
import ImageTextSection from "./components/ImageTextSection";
import VideoCarousel from "./components/VideoCarousel";
import { Test } from "./components/test";
import Form from "./components/Form";

const App = () => {
  // Items for the Image Carousel
  const imageCarousel = [];

  // Items for the Video Carousel
  const videoCarouselItems = [
    "/videos/pavbhaji.mp4",
    "/videos/biriyani.mp4",
    "/videos/burger.mp4",
    "/videos/momos.mp4",
    "/videos/idli.mp4",
    "/videos/chicken.mp4",
    "/videos/pizza.mp4",
  ];

  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="bg-black text-white">
        {/* Image and Text Section */}
        <ImageTextSection />

        {/* Image Carousel Section */}
        <section className="py-8 px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-center text-2xl font-bold mb-4">Cuisines you may like!</h2>
          <Test items={imageCarousel} />
        </section>

        {/* Video Carousel Section */}
        <section className="py-8 px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-center text-2xl font-bold mb-4">Aren't these videos tempting?</h2>
          <VideoCarousel videos={videoCarouselItems} />
        </section>

        {/* Form Section */}
        <section className="pb-0 px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-center text-2xl font-bold mb-4">Get in Touch</h2>
          <Form />
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-black text-white text-center py-4">
        &copy; 2024 Website Assignment
      </footer>
    </div>
  );
};

export default App;
