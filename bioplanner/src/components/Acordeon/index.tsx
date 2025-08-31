import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-[82%] mt-[50px] mb-[40px]"
      defaultValue="item-1"
      color="#F6F6F6"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>O que é BioPlanner</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui illum
            magni nostrum hic aliquid optio fugit quod, at id ducimus maxime
            consequatur adipisci quisquam porro debitis? Consequatur ratione
            repellendus quae.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Como o bioplanner ajuda pacientes com psoriase
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi,
            enim. Debitis, magni! Provident exercitationem dolore voluptatem ad
            recusandae libero eligendi velit sequi, laborum at eveniet
            distinctio dolores sint ea tempore.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Como é feito o agendamento da consulta
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate beatae blanditiis quaerat pariatur voluptatum ullam odit
            ex aperiam maxime accusamus labore inventore a accusantium velit
            error, facere quisquam fugiat!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Os médicos da plataforma atendem casos de doenças de pele?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate beatae blanditiis quaerat pariatur voluptatum ullam odit
            ex aperiam maxime accusamus labore inventore a accusantium velit
            error, facere quisquam fugiat!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
            É possivel realizar consultas online ou somente presencial?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate beatae blanditiis quaerat pariatur voluptatum ullam odit
            ex aperiam maxime accusamus labore inventore a accusantium velit
            error, facere quisquam fugiat!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
            Os médicos da plataforma aceitam plano de saude?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate beatae blanditiis quaerat pariatur voluptatum ullam odit
            ex aperiam maxime accusamus labore inventore a accusantium velit
            error, facere quisquam fugiat!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>
            Como funciona o pagamento da consulta?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate beatae blanditiis quaerat pariatur voluptatum ullam odit
            ex aperiam maxime accusamus labore inventore a accusantium velit
            error, facere quisquam fugiat!
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>


  );
}
