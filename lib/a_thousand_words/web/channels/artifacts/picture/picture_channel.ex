defmodule AThousandWords.Web.Artifacts.PictureChannel do
  use AThousandWords.Web, :channel
  alias AThousandWords.Artifacts
  alias AThousandWords.Artifacts.Picture
  @moduledoc """
  A channel allowing a client to perform CRUD actions on Pictures.
  """

  def join("artifacts:picture", payload, socket) do
    if authorized?(payload) do
      {:ok, %{message: "Joined the pictures channel"}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Test message TODO delete this
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  @doc """
  Replies with a payload containing a list of all the picture structs.
  """
  def handle_in("list_pictures", payload, socket) do
    pictures = Artifacts.list_pictures()
    {:reply, {:ok, %{pictures: pictures}}, socket}
  end

  @doc """
  When passed a payload containing a valid id, replies with the picture from the db.

  If the payload does not contain a valid id, replies with an error.
  """
  def handle_in("get_picture", %{"id" => picture_id}, socket) do
    with %Picture{} = picture <- Artifacts.get_picture!(picture_id) do
      {:reply, {:ok, %{picture: picture}}, socket}
    else
      _error ->
        {:reply, :error, socket}
    end
  end

  @doc """
  When passed a payload of picture params, this function will create a new picture in the db 
  and reply with that picture as a payload to the client.

  If the params are not valid, it will reply with an error and a reason.
  """
  def handle_in("create_picture", %{"params" => picture_params}, socket) do
    with {:ok, %Picture{} = picture} <- Artifacts.create_picture(picture_params) do
      {:reply, {:ok, %{picture: picture}}, socket}
    else
      {:error, reason} -> 
        {:reply, {:error, %{reason: reason}}, socket}
    end
  end

  @doc """
  When passed the id of a valid picture object already in the db and some params to update,
  this will update the picture object in the db and return the new picture as the payload to the client.

  If it fails to update the picture, it will reply with an error.
  """
  def handle_in("update_picture", %{"params" => picture_params, "id" => picture_id}, socket) do
    with %Picture{} = picture <- Artifacts.get_picture!(picture_id) do
      with {:ok, %Picture{} = updated_picture} <- Artifacts.update_picture(picture, picture_params) do
        {:reply, {:ok, %{"picture" => updated_picture}}, socket}
      end
    else
      _error ->
        {:reply, :error, socket}
    end
  end

  @doc """
  Deletes the picture with the given id from the db if the payload contains a valid picture's id.
  """
  def handle_in("delete_picture", %{"id" => picture_id}, socket) do
    with %Picture{} = picture <-Artifacts.get_picture!(picture_id) do
      with {:ok, %Picture{}} <- Artifacts.delete_picture(picture) do
        {:reply, :ok, socket}
      end
    else
      _error -> 
        {:reply, :error, socket}
    end
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end