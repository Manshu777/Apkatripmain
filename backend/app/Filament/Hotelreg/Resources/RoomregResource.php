<?php

namespace App\Filament\Hotelreg\Resources;

use App\Filament\Hotelreg\Resources\RoomregResource\Pages;
use App\Models\Roomreg;
use App\Models\HotelDetails;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Database\Eloquent\Builder;

class RoomregResource extends Resource
{
    protected static ?string $model = Roomreg::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    // public static function query(): Builder
    // {
    //     return Roomreg::query()
    //         ->with('hotelDetails')
    //         ->where('hotel_details_id', auth()->hotel_details_id);
    // }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('hotel_details_id')
                    ->label('Hotel')
                    ->options(
                        HotelDetails::query()
                            ->pluck('id', 'id')
                            ->toArray()
                    )
                    ->required()
                    ->searchable()
                    ->placeholder('Select a Hotel')
                    ->default(2),
                Forms\Components\TextInput::make('room_type')
                    ->required()
                    ->label('Room Type'),

                Forms\Components\TextInput::make('size')
                    ->required()
                    ->label('Room Size'),

                Forms\Components\TextInput::make('bed_type')
                    ->required()
                    ->label('Bed Type'),

                Forms\Components\TextInput::make('price')
                    ->required()
                    ->label('Price')
                    ->numeric(),

                Forms\Components\TextInput::make('max_occupancy')
                    ->required()
                    ->label('Max Occupancy')
                    ->numeric(),

                Forms\Components\TextInput::make('room_ava')
                    ->required()
                    ->label('Room Availability')
                    ->placeholder('e.g., Available, Booked, Under Maintenance')
                    ->maxLength(100),

                Forms\Components\Select::make('features')
                    ->multiple()
                    ->options([
                        'Wifi' => 'Wifi',
                        'AC' => 'AC',
                        'Breakfast' => 'Breakfast',
                        'Pool' => 'Pool',
                        'Gym' => 'Gym',
                        'Parking' => 'Parking',
                        'Spa' => 'Spa',
                    ])
                    ->label('Room Features'),

                Forms\Components\TextArea::make('room_des')
                    ->required()
                    ->label('Room Description')
                    ->placeholder('Describe the room in detail'),

                Forms\Components\TextArea::make('additional_serv')
                    ->label('Additional Services')
                    ->placeholder('Optional services offered with the room'),

                Forms\Components\FileUpload::make('image')
                    ->multiple()
                    ->image()
                    ->label('Room Images')
                    ->directory('room-images')
                    ->preserveFilenames(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->label('Room Images'),
                TextColumn::make('room_type')->label('Room Type'),
                TextColumn::make('size')->label('Size'),
                TextColumn::make('bed_type')->label('Bed Type'),
                TextColumn::make('price')->label('Price'),
                TextColumn::make('max_occupancy')->label('Max Occupancy'),
                TextColumn::make('room_ava')->label('Availability'),
                TextColumn::make('features')->label('Features'),
                TextColumn::make('room_des')->label('Description'),
                TextColumn::make('additional_serv')->label('Additional Services'),
                TextColumn::make('hotelDetails.property_name')->label('Hotel'),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRoomregs::route('/'),
            'create' => Pages\CreateRoomreg::route('/create'),
            'edit' => Pages\EditRoomreg::route('/{record}/edit'),
        ];
    }
}
