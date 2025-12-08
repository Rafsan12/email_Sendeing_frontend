import SocialSVG from "../GSAP/SocialSVG";

export default function Social() {
  return (
    <>
      <section className="w-full flex flex-col items-center justify-center py-10">
        <h2 className="text-6xl px-3.5 text-center mb-6">
          Trusted by teams worldwide
        </h2>
        <SocialSVG />
      </section>
    </>
  );
}
