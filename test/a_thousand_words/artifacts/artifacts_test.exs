defmodule AThousandWords.ArtifactsTest do
  use AThousandWords.DataCase

  alias AThousandWords.Artifacts

  describe "pictures" do
    alias AThousandWords.Artifacts.Picture

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def picture_fixture(attrs \\ %{}) do
      {:ok, picture} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Artifacts.create_picture()

      picture
    end

    test "list_pictures/0 returns all pictures" do
      picture = picture_fixture()
      assert Artifacts.list_pictures() == [picture]
    end

    test "get_picture!/1 returns the picture with given id" do
      picture = picture_fixture()
      assert Artifacts.get_picture!(picture.id) == picture
    end

    test "create_picture/1 with valid data creates a picture" do
      assert {:ok, %Picture{} = picture} = Artifacts.create_picture(@valid_attrs)
    end

    test "create_picture/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Artifacts.create_picture(@invalid_attrs)
    end

    test "update_picture/2 with valid data updates the picture" do
      picture = picture_fixture()
      assert {:ok, picture} = Artifacts.update_picture(picture, @update_attrs)
      assert %Picture{} = picture
    end

    test "update_picture/2 with invalid data returns error changeset" do
      picture = picture_fixture()
      assert {:error, %Ecto.Changeset{}} = Artifacts.update_picture(picture, @invalid_attrs)
      assert picture == Artifacts.get_picture!(picture.id)
    end

    test "delete_picture/1 deletes the picture" do
      picture = picture_fixture()
      assert {:ok, %Picture{}} = Artifacts.delete_picture(picture)
      assert_raise Ecto.NoResultsError, fn -> Artifacts.get_picture!(picture.id) end
    end

    test "change_picture/1 returns a picture changeset" do
      picture = picture_fixture()
      assert %Ecto.Changeset{} = Artifacts.change_picture(picture)
    end
  end
end
