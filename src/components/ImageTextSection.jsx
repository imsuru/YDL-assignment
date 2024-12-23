const ImageTextSection = () => {
  return (
    <section className="image-text-section flex flex-col md:flex-row items-center justify-between px-6 py-8 md:px-12 md:py-12 bg-red-800">
      {/* Image Container */}
      <div className="image-container flex-1 mb-6 md:mb-0 max-w-full md:max-w-sm mt-1">
        <img
          src="/tomato.jpeg"
          alt="Sample"
          className="rounded-lg shadow-md w-full"
        />
      </div>

      {/* Text Container */}
      <div className="text-container flex-1 md:ml-12 text-white text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Tomato is here...</h1>
        <p className="text-base md:text-lg leading-relaxed">
          No, you didn't read it wrong. It's Tomato! We add tomatoes in every dish we deliver or make!
          <br />
          So only order if you are a hardcore tomato lover or else please visit
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            {" "}
            Zomato
          </a>.
        </p>
      </div>
    </section>
  );
};

export default ImageTextSection;
