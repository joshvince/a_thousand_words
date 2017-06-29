defmodule AThousandWords.Repo.Migrations.RemoveImageUrl do
  use Ecto.Migration

  def change do
    alter table(:artifacts_pictures) do
      remove :image_url
      add :image, :string
    end
  end
end
