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

  @doc """
  Replies with a payload containing a list of all the picture structs.
  """
  def handle_in("list_pictures", _payload, socket) do
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
  and, in success, will return a payload containing the newly created picture to the client.

  If the params are not valid, it will reply with an error and a reason.
  """
  def handle_in("create_picture", %{"params" => picture_params}, socket) do
    atomised_params = keys_to_atoms(picture_params)
    with {:ok, %Picture{} = new_picture} <- Artifacts.create_picture(atomised_params) do
      new_list = Artifacts.list_pictures()
      broadcast_updates(:created, {new_picture, new_list}, socket)
      {:noreply, socket}
    else
      {:error, reason} -> 
        {:reply, {:error, %{reason: reason}}, socket}
    end
  end

  @doc """
  When passed the id of a valid picture object already in the db and some params to update,
  this will update the picture object in the db and, in success, 
  will broadcast the new list to all clients in the channel.

  If it fails to update the picture, it will reply with an error.
  """
  def handle_in("update_picture", %{"params" => picture_params, "id" => picture_id}, socket) do
    with %Picture{} = picture <- Artifacts.get_picture!(picture_id) do
      atomised_params = keys_to_atoms(picture_params)
      with {:ok, %Picture{} = updated_picture} <- Artifacts.update_picture(picture, atomised_params) do
        new_list = Artifacts.list_pictures()
        broadcast_updates(:updated, {updated_picture, new_list}, socket)
        {:noreply, socket}
      end
    else
      _anything_else ->
        {:reply, {:error, %{reason: "error"}}, socket}
    end
  end

  @doc """
  Deletes the picture with the given id from the db if the payload contains a valid picture's id
  and, in success, will broadcast the new list to all clients in the channel.
  """
  def handle_in("delete_picture", %{"id" => picture_id}, socket) do
    with %Picture{} = picture <-Artifacts.get_picture!(picture_id) do
      with {:ok, %Picture{} = deleted_picture} <- Artifacts.delete_picture(picture) do
        new_list = Artifacts.list_pictures()
        broadcast_updates(:deleted, {deleted_picture, new_list}, socket)
        {:noreply, socket}
      end
    else
      _error -> 
        {:reply, :error, socket}
    end
  end

  # Broadcast updates about new/deleted/updated pictures to the client to update any out-of-date UI.
  def broadcast_updates(:created, {%Picture{} = new_picture, new_payload}, socket) do
    broadcast socket, "picture_created", %{pictures: new_payload, updated: new_picture}
  end

  def broadcast_updates(:deleted, {%Picture{} = deleted_picture, new_payload}, socket) do
    broadcast socket, "picture_deleted", %{pictures: new_payload, updated: deleted_picture}
  end

  def broadcast_updates(:updated, {%Picture{} = updated_picture, new_payload}, socket) do
    broadcast socket, "picture_updated", %{pictures: new_payload, updated: updated_picture}
  end

  # PRIVATE FUNCTIONS

  defp keys_to_atoms(params) do
    Map.new(params, fn {k, v} -> {String.to_atom(k), v} end)
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end