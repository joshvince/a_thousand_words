defmodule AThousandWords.Repo.Migrations.AddImageUrls do
  use Ecto.Migration

  def change do
    alter table(:artifacts_pictures) do
      add :image_url, :string
    end
  end
end
