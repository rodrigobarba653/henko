"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  en: {
    title: "Privacy Policy",
    intro:
      "In compliance with applicable legislation on the protection of personal data, Henko House SAPI de CV, with address at Galileo 8, 2nd floor, Colonia Polanco, Alcaldía Miguel Hidalgo, Postal Code 11550, and email hola@henkowellnessclub.com, is responsible for the use and protection of your personal data. In this regard, we inform you of the following:",
    section1Title: "1. Personal data we collect",
    section1Body:
      "Through this website, and specifically through the Contact and Booking sections, we may collect the following personal data:",
    section1List: [
      "Full name",
      "Email address",
      "Phone / mobile number",
      "Information related to appointments, reservations or requested services",
      "Any other data that the user voluntarily provides in the forms",
    ],
    section1Note: "We do not collect sensitive personal data.",
    section2Title: "2. Purposes of data processing",
    section2Primary:
      "The personal data we collect will be used for the following primary purposes:",
    section2PrimaryList: [
      "Respond to information requests made through the contact form",
      "Manage, confirm and follow up on appointments or reservations (booking)",
      "Maintain communication related to the services offered",
      "Provide user support and follow-up",
    ],
    section2Secondary:
      "Additionally, your data may be used for the following secondary purposes:",
    section2SecondaryList: [
      "Sending promotional information, news or content related to wellness and the services offered",
    ],
    section2OptOut:
      "If you do not wish your personal data to be processed for these secondary purposes, you may indicate so by sending an email to hola@henkowellnessclub.com.",
    section3Title: "3. Transfer of personal data",
    section3Body:
      "Your personal data will not be shared with third parties, except when necessary to comply with legal obligations or requirements of competent authorities.",
    section4Title: "4. ARCO rights",
    section4Body:
      "You have the right to Access, Rectify, Cancel or Oppose the processing of your personal data (ARCO rights), as well as to revoke the consent granted for its processing. To exercise these rights, you must send a request to the email hola@henkowellnessclub.com, indicating:",
    section4List: [
      "Name of the data subject",
      "Right you wish to exercise",
      "Clear description of the request",
    ],
    section5Title: "5. Use of cookies",
    section5Body:
      "This website may use cookies and other technologies to improve the user experience. The user may disable the use of cookies through their browser settings.",
    section6Title: "6. Changes to the privacy notice",
    section6Body:
      "This privacy notice may be modified at any time to comply with legal updates or internal improvements. Any changes will be published on this same website.",
    section7Title: "7. Consent",
    section7Body:
      "By providing your personal data through this website, you declare that you have read and accepted this Privacy Policy.",
    lastUpdate: "Last update: February 10, 2026",
  },
  es: {
    title: "Aviso de Privacidad",
    intro:
      "En cumplimiento con lo establecido por la legislación aplicable en materia de protección de datos personales, Henko House SAPI de CV, con domicilio en Galileo 8, piso 2, Colonia Polanco, Alcaldía Miguel Hidalgo, Código Postal 11550, y correo electrónico hola@henkowellnessclub.com, es responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:",
    section1Title: "1. Datos personales que se recaban",
    section1Body:
      "A través de este sitio web, y específicamente mediante las secciones de Contacto y Booking, podemos recabar los siguientes datos personales:",
    section1List: [
      "Nombre completo",
      "Correo electrónico",
      "Número telefónico / celular",
      "Información relacionada con citas, reservas o servicios solicitados",
      "Cualquier otro dato que el usuario proporcione voluntariamente en los formularios",
    ],
    section1Note: "No se recaban datos personales sensibles.",
    section2Title: "2. Finalidades del tratamiento de los datos",
    section2Primary:
      "Los datos personales que recabamos serán utilizados para las siguientes finalidades primarias:",
    section2PrimaryList: [
      "Atender solicitudes de información realizadas a través del formulario de contacto",
      "Gestionar, confirmar y dar seguimiento a citas o reservas (booking)",
      "Mantener comunicación relacionada con los servicios ofrecidos",
      "Proporcionar atención y seguimiento al usuario",
    ],
    section2Secondary:
      "De manera adicional, sus datos podrán ser utilizados para las siguientes finalidades secundarias:",
    section2SecondaryList: [
      "Envío de información promocional, novedades o contenidos relacionados con wellness y servicios ofrecidos",
    ],
    section2OptOut:
      "En caso de no desear que sus datos personales sean tratados para estas finalidades secundarias, el usuario podrá manifestarlo enviando un correo a hola@henkowellnessclub.com.",
    section3Title: "3. Transferencia de datos personales",
    section3Body:
      "Sus datos personales no serán compartidos con terceros, salvo que sea necesario para cumplir con obligaciones legales o requerimientos de autoridades competentes.",
    section4Title: "4. Derechos ARCO",
    section4Body:
      "El usuario tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (Derechos ARCO), así como a revocar el consentimiento otorgado para su tratamiento. Para ejercer estos derechos, deberá enviar una solicitud al correo electrónico hola@henkowellnessclub.com, indicando:",
    section4List: [
      "Nombre del titular",
      "Derecho que desea ejercer",
      "Descripción clara de la solicitud",
    ],
    section5Title: "5. Uso de cookies",
    section5Body:
      "Este sitio web puede utilizar cookies y otras tecnologías para mejorar la experiencia del usuario. El usuario puede deshabilitar el uso de cookies a través de la configuración de su navegador.",
    section6Title: "6. Cambios al aviso de privacidad",
    section6Body:
      "El presente aviso de privacidad puede ser modificado en cualquier momento para cumplir con actualizaciones legales o mejoras internas. Cualquier cambio será publicado en este mismo sitio web.",
    section7Title: "7. Consentimiento",
    section7Body:
      "Al proporcionar sus datos personales a través de este sitio web, el usuario manifiesta haber leído y aceptado el presente Aviso de Privacidad.",
    lastUpdate: "Última actualización: 10 de febrero de 2026",
  },
};

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main className="bg-bg-beige min-h-screen pt-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] font-heading mb-8">
            {t.title}
          </h1>
          <p className="text-lg text-[#1a1a1a] leading-relaxed font-body mb-10">
            {t.intro}
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-main-green font-heading mb-3">
              {t.section1Title}
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed font-body mb-4">
              {t.section1Body}
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#1a1a1a] font-body mb-4">
              {t.section1List.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-[#1a1a1a] font-body">{t.section1Note}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-main-green font-heading mb-3">
              {t.section2Title}
            </h2>
            <p className="text-[#1a1a1a] font-body mb-2">{t.section2Primary}</p>
            <ul className="list-disc list-inside space-y-2 text-[#1a1a1a] font-body mb-4">
              {t.section2PrimaryList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-[#1a1a1a] font-body mb-2">{t.section2Secondary}</p>
            <ul className="list-disc list-inside space-y-2 text-[#1a1a1a] font-body mb-4">
              {t.section2SecondaryList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-[#1a1a1a] font-body">{t.section2OptOut}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-main-green font-heading mb-3">
              {t.section3Title}
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed font-body">
              {t.section3Body}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-main-green font-heading mb-3">
              {t.section4Title}
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed font-body mb-4">
              {t.section4Body}
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#1a1a1a] font-body">
              {t.section4List.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-main-green font-heading mb-3">
              {t.section5Title}
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed font-body">
              {t.section5Body}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-main-green font-heading mb-3">
              {t.section6Title}
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed font-body">
              {t.section6Body}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-main-green font-heading mb-3">
              {t.section7Title}
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed font-body">
              {t.section7Body}
            </p>
          </section>

          <p className="text-sm text-[#1a1a1a]/80 font-body">
            {t.lastUpdate}
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
