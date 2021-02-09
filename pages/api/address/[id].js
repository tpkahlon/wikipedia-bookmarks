export default async function addressHandler({ query: { id } }, res) {
  const myUrl = decodeURIComponent(id);

  const req = await fetch(new URL(myUrl));

  if (!req.ok) {
    return res.status(200).json({ message: `Wikipedia page not found.` });
  }

  const txt = await req.text();
  return res.status(200).json({ result: txt });
}
