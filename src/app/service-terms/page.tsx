"use client";
import { Button } from "@/components/Button";
import { Envelope, Globe, WhatsappLogo } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import economixLogoImg from "../../assets/economix-logo.png";

export default function ServiceTerms() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto w-[1200px] max-w-[90%] max-md:gap-4 py-4 dark:text-gray-300">
        <Image
          src={economixLogoImg}
          alt="Icon EconomiX"
          width={100}
          height={100}
          className="m-auto"
        />
        <h1 className="font-black text-xl text-purple-800">
          EconomiX - Termos de serviço
        </h1>
        <small className="text-center">Última atualização: 05/06/2023</small>
        <div className="text-justify mt-4">
          <p>
            Estes Termos de Serviço regem o uso do nosso serviço de login
            através do Google e do Facebook. Ao utilizar nosso serviço, você
            concorda em cumprir estes termos. Leia-os atentamente antes de
            utilizar o serviço.
          </p>
          <ol className="list-decimal tabular-nums-[20] [&_li]:mt-4 [&_li>h2]:font-bold">
            <li>
              <h2>Uso do Serviço</h2>
              <ol>
                <li>
                  1.1. Ao utilizar nosso serviço de login através do Google e do
                  Facebook, você concorda em fornecer informações precisas,
                  atualizadas e completas durante o processo de autenticação.
                  Você é responsável por manter a confidencialidade das suas
                  credenciais de login.
                </li>
                <li>
                  1.2. Você concorda em utilizar o serviço apenas para fins
                  legítimos e de acordo com as leis e regulamentos aplicáveis.
                  Você não pode utilizar o serviço para qualquer atividade
                  ilegal, fraudulenta, difamatória, prejudicial ou ofensiva.
                </li>
                <li>
                  1.3. Reservamo-nos o direito de recusar o acesso ao serviço a
                  qualquer pessoa, a nosso exclusivo critério e a qualquer
                  momento, sem aviso prévio.
                </li>
              </ol>
            </li>
            <li>
              <h2>Propriedade Intelectual</h2>
              <ol>
                <li>
                  2.1. Todos os direitos de propriedade intelectual relacionados
                  ao serviço, incluindo, mas não se limitando a, direitos
                  autorais, marcas comerciais e segredos comerciais, são de
                  nossa propriedade ou licenciados para nós. Você concorda em
                  não copiar, reproduzir, modificar, distribuir ou criar obras
                  derivadas com base no serviço sem nossa autorização prévia por
                  escrito.
                </li>
                <li>
                  2.2. Ao utilizar o serviço, você nos concede uma licença
                  limitada, não exclusiva, não transferível e revogável para
                  usar suas informações de autenticação fornecidas pelo Google e
                  pelo Facebook estritamente para fins de autenticação e
                  prestação do serviço.
                </li>
              </ol>
            </li>
            <li>
              <h2>Limitação de Responsabilidade</h2>
              <ol>
                <li>
                  3.1. O serviço é fornecido &ldquo;no estado em que se
                  encontra&rdquo;, sem garantias de qualquer tipo, expressas ou
                  implícitas. Não garantimos que o serviço será contínuo,
                  seguro, livre de erros ou adequado às suas necessidades.
                </li>
                <li>
                  3.2. Em nenhuma circunstância seremos responsáveis por
                  quaisquer danos diretos, indiretos, incidentais,
                  consequenciais, especiais ou exemplares decorrentes do uso ou
                  incapacidade de uso do serviço.
                </li>
              </ol>
            </li>
            <li>
              <h2>Modificações do Serviço</h2>
              Reservamo-nos o direito de modificar, suspender ou descontinuar o
              serviço a qualquer momento, com ou sem aviso prévio. Não seremos
              responsáveis perante você ou terceiros por qualquer modificação,
              suspensão ou descontinuação do serviço.
            </li>
            <li>
              <h2>Links para Terceiros</h2>O serviço pode conter links para
              sites de terceiros que não controlamos. Não somos responsáveis
              pelo conteúdo, políticas de privacidade ou práticas desses sites
              de terceiros. A inclusão de qualquer link não implica em nosso
              endosso ou aprovação desses sites.
            </li>
            <li>
              <h2>Disposições Gerais</h2>
              <ol>
                <li>
                  6.1. Estes termos constituem o acordo completo entre você e
                  nós em relação ao serviço e substituem todos os acordos
                  anteriores ou contemporâneos.
                </li>
                <li>
                  6.2. Se qualquer disposição destes termos for considerada
                  inválida ou inexequível, as demais disposições permanecerão em
                  pleno vigor e efeito.
                </li>
                <li>
                  6.3. Estes termos serão regidos e interpretados de acordo com
                  as leis do Brasil. Qualquer disputa relacionada a estes termos
                  será submetida à jurisdição exclusiva dos tribunais
                  competentes de MG.
                </li>
              </ol>
            </li>
            <li>
              <h2>Contato</h2>
              Se você tiver dúvidas sobre estes termos de serviço, entre em
              contato conosco utilizando as informações fornecidas abaixo:
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
          Ao utilizar nosso serviço, você concorda em cumprir estes termos de
          serviço. Se você não concorda com estes termos, não utilize o serviço
          de login através do Google e do Facebook.
          <br />
          <br />
          Agradecemos por ler e compreender nossos termos de serviço.
        </div>
        <Link href="../">
          <Button isSmall className="px-10 mt-8">
            Voltar ao início
          </Button>
        </Link>
      </div>
    </>
  );
}
