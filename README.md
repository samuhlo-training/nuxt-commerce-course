

## 📦 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd 02-mi-sitio
   ```

2. **Instala las dependencias:**
   ```bash
   pnpm install
   ```

## ⚙️ Configuración

3. **Configura las variables de entorno:**
   - Copia el archivo `.env.template` a `.env`
   - Completa las variables necesarias (como la URL de la base de datos, claves de API, etc.)

4. **Aplica las migraciones de la base de datos:**
   ```bash
   npx prisma migrate dev
   ```

5. **Ejecuta el seed para poblar la base de datos:**
   ```bash
   pnpm seed
   ```

## ▶️ Uso

6. **Inicia el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

   El sitio estará disponible en `http://localhost:3000`.

## 📜 Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo
- `pnpm build`: Construye la aplicación para producción
- `pnpm preview`: Previsualiza la build de producción
- `pnpm seed`: Ejecuta el script de seed para la base de datos
- `pnpm prisma studio`: Abre Prisma Studio para gestionar la base de datos



¡Disfruta desarrollando con este proyecto! 🎉