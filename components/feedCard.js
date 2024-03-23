import { Dialog } from "./ui/dialog";
import { DynamicImage } from "./dynamic-image";

export default function FeedCard({ image, author, text }) {
  return (
    <Dialog>
      <DynamicImage image={image} author={author} text={text} />
    </Dialog>
  );
}
