import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { Coordinates, Data, createDataObject, getCoordinatesFromUrl } from './libs';
import { getCafeIDsFromGoogle } from './google-api';
import { staticPlugin } from '@elysiajs/static';

import { html } from '@elysiajs/html'
const app = new Elysia();

app.use(cors());
app.use(html())
app.use(staticPlugin('/src/static'));
app.get('/', async () => {
  return new Response(Bun.file("index.html"));
});

app.get('/test', async () => {
  return new Response('the tism won the internet');
});

app.get('/load-button', async () => {
  return new Response('<load-button></load-button>');
});
app.post('/contact', async (ctx) => {
  const formData: FormData = await ctx.request.formData();
  const query:string = formData.get('query') as string;
  const mapsUrl: Coordinates = getCoordinatesFromUrl(formData.get('url') as Coordinates);
  const radius: string = formData.get('radius') as string
  const data:Data = createDataObject(mapsUrl,query,radius);
  const queryResult:any = await getCafeIDsFromGoogle(data); 

  return (
    <table>
      <thead>
        <tr>
          <th>Place Name</th>
          <th>Website Address</th>
          <th>Place Name</th>
        </tr>
      </thead>
      <tbody>
        {queryResult.places.map((place: any) => (
          <tr key={place.id}>
            <td>{place.id}</td>
            <td>{place.websiteUri}</td>
            <td>{place.displayName.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
