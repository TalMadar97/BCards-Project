function WorldMap() {
  return (
    <>
      <div className="google-maps-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1743631.7383440612!2d36.400755399891324!3d31.399500264717094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1500492432a7c98b%3A0x6a6b422013352cba!2z15nXqdeo15DXnA!5e0!3m2!1siw!2sil!4v1735669590063!5m2!1siw!2sil"
          allowfullscreen
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}

export default WorldMap;
