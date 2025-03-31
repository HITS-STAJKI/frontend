import { Button } from "@mantine/core";
import { PencilSvgrepoCom } from "../../assets/icons";

interface EditButtonProps {
    onClick: () => void;
}

export function EditButton({ onClick }: EditButtonProps) {
       return (
           <Button color="gray" onClick={onClick} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
               <PencilSvgrepoCom />
           </Button>
       );
   }

