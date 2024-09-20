function main() {
  const title = document.getElementById("title");
  const slugInput = document.getElementById("slug");

  title.addEventListener("input", (e) => {
    const slug = generateSlug(e.target.value);

    slugInput.value = slug;
  });

  function generateSlug(title) {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Trim whitespace from start and end
      .replace(/[\s\W-]+/g, "-") // Replace spaces, non-word characters, and multiple dashes with a single dash
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
  }
}

main();
