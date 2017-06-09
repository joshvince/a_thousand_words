defmodule AThousandWords.Repo.Migrations.CreateAThousandWords.Artifacts.Picture do
  use Ecto.Migration

  def change do
    create table(:artifacts_pictures) do
      add :year, :integer
      add :name, :string
      add :description, :string
      add :location, :geometry
      add :file_location, :string
      timestamps()
    end

  end
end
