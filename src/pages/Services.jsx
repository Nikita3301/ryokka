import React from "react";

function Services() {
  return (
    <div className="w-full h-full">
      <div class="flex p-4 flex-wrap gap-6">
        <div class="bg-neutral-900 text-neutral-300 rounded-lg shadow-md p-4 w-[600px]">
          <img
            src="https://i0.wp.com/elitelandscaping.com/wp-content/uploads/2021/10/AdobeStock_101410483-scaled.jpeg?fit=2560%2C1755&ssl=1"
            alt="Landscape Design"
            class="rounded-t-lg"
          />
          <div className="py-6">
            <h3 class="text-xl font-semibold">Landscape Design</h3>
            <p class="mt-2">
              Creating stunning outdoor spaces tailored to your needs.
            </p>
            <h4 class="mt-4 font-semibold">Description:</h4>
            <p>
              Comprehensive design services including site analysis, conceptual
              designs, and planting plans.
            </p>
            <h4 class="mt-2 font-semibold">Process:</h4>
            <p>
              Initial consultation, concept sketches, final design presentation.
            </p>
            <h4 class="mt-2 font-semibold">Benefits:</h4>
            <p>
              Personalized designs that enhance aesthetics and functionality.
            </p>
          </div>
        </div>
        <div class="bg-neutral-900 text-neutral-300 rounded-lg shadow-md p-4 w-[600px]">
          <img
            src="https://www.hirethegardener.com/wp-content/uploads/2021/03/4-Ways-a-Garden-Maintenance-Company-Can-Help-You.jpg"
            alt="Garden Maintenance"
            class="rounded-t-lg"
          />
          <div className="py-6">
            <h3 class="text-xl font-semibold">Garden Maintenance</h3>
            <p class="mt-2">
              Keeping your garden lush and beautiful all year round.
            </p>
            <h4 class="mt-4 font-semibold">Description:</h4>
            <p>
              Routine maintenance services including lawn care, pruning, and
              seasonal clean-ups.
            </p>
            <h4 class="mt-2 font-semibold">Process:</h4>
            <p>Customized maintenance plans based on client needs.</p>
            <h4 class="mt-2 font-semibold">Benefits:</h4>
            <p>Keep your garden healthy and vibrant throughout the year.</p>
          </div>
        </div>
        <div class="bg-neutral-900 text-neutral-300 rounded-lg shadow-md p-4 w-[600px]">
          <img
            src="https://emeraldlawns.com/wp-content/uploads/2023/07/BA-Rock.png"
            alt="Hardscaping"
            class="rounded-t-lg"
          />
          <div class="py-6">
            <h3 class="text-xl font-semibold">Hardscaping</h3>
            <p class="mt-2">
              Designing and installing patios, walkways, and more.
            </p>
            <h4 class="mt-4 font-semibold">Description:</h4>
            <p>
              Installation of non-plant elements such as patios, walkways, and
              retaining walls.
            </p>
            <h4 class="mt-2 font-semibold">Process:</h4>
            <p>Design consultation, material selection, and installation.</p>
            <h4 class="mt-2 font-semibold">Benefits:</h4>
            <p>Enhance outdoor usability and aesthetics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
