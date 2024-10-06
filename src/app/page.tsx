import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    <main className="container">
      <Header />
      <Hero />
      <section className="text-center mt-24">
        <p className="text-gray-600">Trusted by those companies: </p>
        <div className="flex gap-8 *:h-7 mt-6 justify-center">
          <img src="https://images.ctfassets.net/lh3zuq09vnm2/vHHaKAaEeQuNcucdWM50V/23351da3b1ad9d7483ddf11aed64b4b7/Mixpanel.svg" alt="Mixpanel" />
          <img src="https://images.ctfassets.net/lh3zuq09vnm2/7dsuPwH4V8KJvCexSZueZc/272b2ef619de8ae4b443758413a19733/Unbounce_Logo.svg" alt="Unbounce_Logo" />
          <img src="https://images.ctfassets.net/lh3zuq09vnm2/6jZ182ywMavcqhY7WiLS5x/fb3c393066ae09dc17819472dc605d8f/15Five.svg" alt="15Five" />
          <img src="https://images.ctfassets.net/lh3zuq09vnm2/1FA2gEsWeu2MyGSy6Qp6ao/859833105cdd6ed5cc75eb5e4bd9cff7/HelloFresh.svg" alt="HelloFresh" />
        </div>
      </section>
    </main>
  );
}
