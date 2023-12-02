import { createNextPageApiHandler } from 'uploadthing/next-legacy';

import { ourFileRouter } from './upload-thing/server/uploadthing';

const handler = createNextPageApiHandler({
	router: ourFileRouter,
});

export default handler;
