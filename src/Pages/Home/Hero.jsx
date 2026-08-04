import { Link } from "react-router-dom";

import hero from "../../assets/images/hero.png";

function Hero() {

  return (

    <section className="max-w-7xl mx-auto px-5 pt-8">

      <div className="relative rounded-xl overflow-hidden">

        <img

          src={hero}

          alt="Hero"

          className="w-full h-[220px] md:h-[520px] object-cover"

        />

      </div>

    </section>

  );

}

export default Hero;