export default function About() {
  return (
    <div className="min-h-screen text-neutral-100 flex flex-col justify-center items-center">
      <div className="mt-10 p-4 md:mt-8! md:p-20! text-3xl text-center md:text-4xl w-full md:text-right">
        Experiment, Trade, and Collect Live Art
      </div>
      <div className="max-w-[1000px] px-4 md:px-0 flex flex-col items-center pb-20 md:pb-32">
        <div className="text-xl text-center md:text-left md:text-2xl mt-16 md:mt-8 max-w-[800px]">
          <div className="">
            Launched in December 2023, The Sphere Karmetplace emerges as a
            unique platform, fostering the connection between live art, its
            creators, and the audiences that support them. It’s a marketplace
            dedicated to the circulation of live art seeds and derivatives
            within a collaborative spirit of art creation.
          </div>
        </div>
        <div className="py-4 md:py-6 mt-20 md:mt-28 mb-2 md:mb-6 text-left flex flex-col md:grid! md:grid-cols-3! gap-8">
          <div className="">
            <div className="font-bold text-2xl mb-3">Onchain Royalties</div>
            <div className="">
              The Karmetplace ensures that artists continue to receive royalties
              from secondary sales. This is enforced onchain to guarantee
              ongoing support for creators even after their initial distribution
              or sale.
            </div>
          </div>
          <div className="">
            <div className="font-bold text-2xl mb-3">Artistic Support</div>
            <div className="">
              The Sphere Karmetplace encourages sellers to direct a part of
              their sale proceeds to The Sphere Common Pool. New cycles could be
              initiated after certain thresholds are met and new governance
              rituals are embodied.
            </div>
          </div>
          <div className="mb-20">
            <div className="font-bold text-2xl mb-3">
              Showcasing Diverse Art Collections
            </div>
            <div className="">
              At its launch, the Karmetplace features the The Sphere Karmic
              Objects collection, composed of 6 artworks, with a total supply of
              1000 editions. It’s offering ffosters the interaction among
              artists, audiences, collectors, and curators.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <div className="font-bold text-2xl flex justify-center mb-2 md:mb-0">
            Team
          </div>
          <div className="flex flex-col gap-3 md:gap-0">
            <div className="font-bold">
              <span className="font-normal mr-3">Development:</span> Vitor
              Butkus
              {' | '}
              <a
                href="https://uint.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Uint Studio
              </a>
            </div>
            <div className="font-bold">
              <span className="mr-3 font-normal">
                Research and smart contract deployment:
              </span>{' '}
              Pedro Victor Brandão{' | '}
              <a
                href="https://uint.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Uint Studio
              </a>
            </div>
            <div className="font-bold">
              <span className="mr-1 font-normal">Organized by</span>{' '}
              <a
                href="https://www.thesphere.as/"
                target="_blank"
                className="underline"
                rel="noopener noreferrer"
              >
                The Sphere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
