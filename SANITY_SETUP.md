# Sanity CMS Setup za Klupko Klupče

## Instalacija Sanity CMS-a

### 1. Instaliraj Sanity CLI
```bash
npm install -g @sanity/cli
```

### 2. Login u Sanity
```bash
sanity login
```

### 3. Kreiraj novi Sanity projekat
```bash
sanity init
```

Kada te pita:
- **Project name**: `klupko-klupce-cms`
- **Dataset name**: `production`
- **Template**: `Clean project with no predefined schemas`

### 4. Kopiraj Project ID i Dataset
Nakon kreiranja projekta, kopiraj:
- **Project ID** (iz sanity.config.ts)
- **Dataset name** (obično `production`)

### 5. Ažuriraj .env.local fajl
Kreiraj `.env.local` fajl u root direktorijumu sa:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 6. Instaliraj potrebne Sanity pakete
```bash
npm install next-sanity @sanity/vision @sanity/portable-text-editor
```

### 7. Pokreni Sanity Studio
```bash
npm run dev
```

Sanity Studio će biti dostupan na: `http://localhost:3000/studio`

## Struktura CMS-a

### Kategorije
- **Ćebad za bebe**
- **Prekrivači za krevet**
- **Stoličarke**
- **Šal i kape**
- **Torbe**
- **Jastučnice**

### Proizvodi
Svaki proizvod ima:
- Naziv
- Slug (URL)
- Opis
- Kategoriju
- Slike (minimalno 1)
- Cenu (opciono)
- Status na stanju
- Istaknuti proizvod (za početnu stranu)
- SEO podatke

### Stranice
- O nama
- Kontakt
- Ostale custom stranice

### Podešavanja sajta
- Osnovne informacije o brendu
- Kontakt podaci
- Društvene mreže
- Logo
- Tekst o nama

## Dodavanje sadržaja

### 1. Kreiraj kategorije
1. Idi na `/studio`
2. Klikni "Kategorije"
3. Klikni "Create"
4. Popuni sve potrebne podatke
5. Sačuvaj

### 2. Dodaj proizvode
1. Idi na "Proizvodi"
2. Klikni "Create"
3. Popuni:
   - Naziv proizvoda
   - Opis
   - Odaberi kategoriju
   - Upload slike
   - Postavi cenu (opciono)
   - Označi "Na stanju"
   - Označi "Istaknuti" ako želiš da se prikaže na početnoj strani
4. Sačuvaj

### 3. Podesi osnovne informacije
1. Idi na "Podešavanja sajta"
2. Popuni sve potrebne podatke
3. Upload logo
4. Dodaj kontakt informacije
5. Sačuvaj

## SEO optimizacija

Svaki proizvod, kategorija i stranica ima SEO sekciju gde možeš dodati:
- SEO naslov
- SEO opis
- Ključne reči

## Backup i sigurnost

- Sanity automatski čuva sve promene
- Možeš eksportovati podatke iz Sanity Studio
- Preporučuje se redovno backup-ovanje

## Troubleshooting

### Problem: "Project not found"
- Proveri da li je Project ID ispravan u .env.local
- Proveri da li si login-ovan u Sanity CLI

### Problem: "Dataset not found"
- Proveri da li je Dataset name ispravan
- Kreiraj dataset u Sanity Studio ako ne postoji

### Problem: Slike se ne prikazuju
- Proveri da li su slike upload-ovane u Sanity
- Proveri da li su URL-ovi ispravni
