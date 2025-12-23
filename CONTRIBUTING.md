# Contributing to Khaista Boutique

Thank you for your interest in contributing to Khaista Boutique! This project supports Afghan women artisans, and every contribution helps us build a better platform.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/khaista-boutique.git
   cd khaista-boutique
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up your environment** by copying `.env.example` to `.env` and filling in the values
5. **Run the development server**:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing naming conventions
- Use Tailwind CSS for styling
- Keep components small and focused
- Write meaningful commit messages

### Component Structure
- Place reusable components in `client/src/components/`
- Place page components in `client/src/pages/`
- Use the established folder structure

### Database Changes
- Use Drizzle ORM for all database operations
- Create migrations for schema changes:
  ```bash
  npm run db:generate
  npm run db:migrate
  ```

## Making Changes

1. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test your changes** thoroughly:
   ```bash
   npm run build
   npm run dev
   ```

4. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add: new product filtering feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation if you've changed APIs or added features
3. Test that your changes work in both development and production builds
4. Write a clear description of what your changes do
5. Link any relevant issues

## Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Help us squash bugs!
- **Feature additions** - New functionality that helps the mission
- **UI/UX improvements** - Make the site more beautiful and usable
- **Documentation** - Improve README, guides, or code comments
- **Performance optimizations** - Make the site faster
- **Accessibility improvements** - Make the site more inclusive

## Cultural Sensitivity

Since this project represents Afghan culture and supports Afghan women:

- Be respectful when working with cultural elements
- Maintain the authentic representation of Afghan craftsmanship
- Keep the mission of supporting Afghan women central to decisions
- If unsure about cultural aspects, ask for guidance

## Getting Help

- Create an issue for bugs or feature requests
- Use GitHub Discussions for questions
- Check existing issues before creating new ones

## Recognition

Contributors will be recognized in our README and on our website (with permission).

Thank you for helping us support Afghan women artisans! 💝