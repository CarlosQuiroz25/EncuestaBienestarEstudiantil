export const MapaUbicacion = () => {
  return (
    <div className="overflow-hidden rounded-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.7080534279453!2d-75.54683287436491!3d6.340117107281425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442f997e956ca9%3A0x806e6dcdaf3237c!2sDg.%2050A%20%2338-20%20Piso%205%2C%20Hermosa%20Provincia%2C%20Bello%2C%20Antioquia%2C%20Colombia!5e0!3m2!1sen!2sus!4v1744167913537!5m2!1sen!2sus"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Mapa de ubicación"
      ></iframe>
    </div>
  );
};