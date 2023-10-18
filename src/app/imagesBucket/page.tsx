import { Box, Heading } from '@chakra-ui/react';
import ImageGallery from './gallery';

export async function loadImages() {

  const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-api-key': process.env.AWS_S3_LAMBDA_APIKEY || '',
    }

  const res = await fetch(process.env.AWS_S3_LAMBDA_URL || '', {
    method: 'GET',
    headers,
  });
  const { images }: { images: string[]} = await res.json();

  return { images };
}

const YourImagePage: React.FC = async () => {
  const {images} = await loadImages();
  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" my={4}>
        Galería de Imágenes
      </Heading>
      <ImageGallery images={images} />
    </Box>
  );
};


export default YourImagePage;