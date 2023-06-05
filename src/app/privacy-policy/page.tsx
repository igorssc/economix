"use client";
import { Envelope, Globe, WhatsappLogo } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import economixLogoImg from "../../assets/economix-logo.png";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto w-[1200px] max-w-[90%] max-md:gap-4 py-4 text-gray-300">
        <Image
          src={economixLogoImg}
          alt="Icon EconomiX"
          width={100}
          height={100}
          className="m-auto"
        />
        <h1 className="font-black text-xl">
          EconomiX - Política de Privacidade
        </h1>
        <small className="text-center">Última atualização: 05/06/2023</small>
        <div className="text-justify mt-4">
          <p>
            A sua privacidade é importante para nós. Nesta política de
            privacidade, explicamos quais informações coletamos, como as
            utilizamos e compartilhamos, e como você pode exercer seus direitos
            em relação a essas informações ao usar o nosso serviço de login
            através do Google e do Facebook.
          </p>
          <ol className="list-decimal tabular-nums-[20] [&_li]:mt-4 [&_li>h2]:font-bold">
            <li>
              <h2>Informações que coletamos</h2>
              Ao utilizar o nosso serviço de login com o Google e o Facebook,
              podemos coletar as seguintes informações:
              <ol>
                <li>
                  1.1. Informações de autenticação: quando você opta por fazer
                  login através do Google ou do Facebook, podemos coletar
                  informações de autenticação fornecidas por essas plataformas,
                  como seu nome, endereço de e-mail e foto de perfil.
                </li>
                <li>
                  1.2. Informações de acesso: podemos coletar informações sobre
                  o uso do nosso serviço, incluindo detalhes sobre as interações
                  realizadas, como datas e horários de acesso, endereço IP,
                  informações do dispositivo e do navegador utilizado.
                </li>
              </ol>
            </li>
            <li>
              <h2>Uso das informações</h2>
              Utilizamos as informações coletadas para os seguintes fins:
              <ol>
                <li>
                  2.1. Autenticação: utilizamos as informações de autenticação
                  fornecidas pelo Google e pelo Facebook para autenticar sua
                  identidade e permitir o acesso ao nosso serviço.
                </li>
                <li>
                  2.2. Melhoria do serviço: utilizamos as informações de acesso
                  para melhorar o desempenho e a funcionalidade do nosso
                  serviço, garantindo uma experiência segura e personalizada
                  para os usuários.
                </li>
                <li>
                  2.3. Comunicação: podemos utilizar seu endereço de e-mail para
                  enviar comunicações relacionadas ao serviço, como
                  atualizações, notificações e informações importantes sobre sua
                  conta.
                </li>
              </ol>
            </li>
            <li>
              <h2>Compartilhamento de informações</h2>
              Não compartilhamos suas informações pessoais com terceiros, exceto
              nas seguintes circunstâncias:
              <ol>
                <li>
                  3.1. Provedores de serviços: podemos compartilhar suas
                  informações com prestadores de serviços terceirizados que nos
                  auxiliam na operação, manutenção e melhoria do nosso serviço.
                  Esses prestadores de serviços têm acesso limitado às suas
                  informações e estão sujeitos a obrigações contratuais de
                  confidencialidade.
                </li>
                <li>
                  3.2. Requisitos legais: podemos compartilhar suas informações
                  pessoais quando necessário para cumprir com obrigações legais,
                  regulatórias, processos judiciais ou solicitações
                  governamentais.
                </li>
                <li>
                  2.3. Comunicação: podemos utilizar seu endereço de e-mail para
                  enviar comunicações relacionadas ao serviço, como
                  atualizações, notificações e informações importantes sobre sua
                  conta.
                </li>
              </ol>
            </li>
            <li>
              <h2>Retenção das informações</h2>
              Mantemos suas informações pessoais pelo tempo necessário para
              fornecer o serviço e cumprir com nossas obrigações legais. Após
              esse período, suas informações serão excluídas de nossos sistemas.
            </li>
            <li>
              <h2>Seus direitos</h2>
              Você tem o direito de solicitar o acesso, retificação, exclusão ou
              restrição do uso das suas informações pessoais. Além disso, você
              pode se opor ao processamento das suas informações ou solicitar a
              portabilidade dos seus dados.
              <br />
              Para exercer esses direitos ou se tiver dúvidas sobre a nossa
              política de privacidade, entre em contato conosco utilizando as
              informações de contato fornecidas no final desta política.
            </li>
            <li>
              <h2>Segurança das informações</h2>
              Adotamos medidas de segurança adequadas para proteger suas
              informações pessoais contra acesso não autorizado, uso indevido,
              divulgação, alteração ou destruição. No entanto, é importante
              lembrar que nenhum método de transmissão pela internet ou
              armazenamento eletrônico é totalmente seguro.
            </li>
            <li>
              <h2>Alterações nesta política de privacidade</h2>
              Podemos atualizar esta política de privacidade periodicamente.
              Recomendamos que você revise esta página regularmente para estar
              ciente das eventuais alterações. A continuação do uso do nosso
              serviço após a publicação de alterações nesta política será
              considerada como aceitação dessas alterações.
            </li>
            <li>
              <h2>Contato</h2>
              Se você tiver dúvidas, preocupações ou solicitações relacionadas à
              nossa política de privacidade, entre em contato conosco através
              dos seguintes meios:
              <div className="mt-4 mb-6">
                <Link href="https://api.whatsapp.com/send?phone=5531993185969">
                  <div className="flex gap-4 sm:gap-8">
                    <WhatsappLogo className="text-2xl" weight="light" />
                    <span>(31) 9 99318-5969</span>
                  </div>
                </Link>
                <Link href="mailto:contato@igsdesign.com.br">
                  <div className="flex gap-4 sm:gap-8">
                    <Envelope className="text-2xl" weight="light" />
                    <span>contato@igsdesign.com.br</span>
                  </div>
                </Link>
                <Link href="https://igsdesign.com.br" target="_blank">
                  <div className="flex gap-4 sm:gap-8">
                    <Globe className="text-2xl" weight="light" />
                    <span>https://igsdesign.com.br</span>
                  </div>
                </Link>
              </div>
            </li>
          </ol>
          Esperamos que esta política de privacidade tenha esclarecido como
          lidamos com suas informações pessoais ao utilizar nosso serviço de
          login com o Google e o Facebook. Se você tiver alguma dúvida
          adicional, não hesite em entrar em contato conosco.
        </div>
        <Link
          href="../"
          className="border-2 rounded-full py-2 px-5 gap-3 w-full max-w-[300px] flex items-center justify-center mt-8"
        >
          Voltar ao início
        </Link>
      </div>
    </>
  );
}
