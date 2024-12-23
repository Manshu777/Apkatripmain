<?php

namespace App\Filament\Hotelreg\Resources;

use App\Filament\Hotelreg\Resources\HoteldetailsResource\Pages;
use App\Filament\Hotelreg\Resources\HoteldetailsResource\RelationManagers;
use App\Models\hoteldetails;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tab;

use Filament\Tables\Columns\ImageColumn;

use Filament\Tables\Columns\TextColumn;


class HoteldetailsResource extends Resource
{
    protected static ?string $model = Hoteldetails::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

 
    public static function form(Form $form): Form
    {
        return $form->schema([


            TextInput::make('property_name')->label('Property Name')->required(),
            RichEditor::make('hotel_des')->label('Hotel Description')->required(),
            FileUpload::make('hotel_img')
                ->label('Hotel Images')
                ->multiple()
                ->required(),
            Select::make('rating')
                ->options([
                    1 => '1 Star',
                    2 => '2 Stars',
                    3 => '3 Stars',
                    4 => '4 Stars',
                    5 => '5 Stars',
                ])
                ->label('Hotel Rating')->required(),
            DatePicker::make('built_year')->label('Year Built')->required(),
            TextInput::make('price')->label("Price")->required(),
            DatePicker::make('accepting_since')->label('Accepting Since')->required(),
            TextInput::make('email')->label('Email')->required(),
            TextInput::make('number')->label('Phone Number')->required(),
            TextInput::make('land_line')->label("Land Line"),

            RichEditor::make('address')->label('Full Address')->required(),
            TextInput::make('country')->label("Country")->required(),
            TextInput::make('state')->label("State")->required(),
            TextInput::make('city')->label("City")->required(),
            TextInput::make('locality')->label("Locality")->required(),
            TextInput::make('house_no')->label("House No")->required(),

            TextInput::make('pincode')->label("Pincode")->required(),

            RichEditor::make('terms')->label('Terms & Conditions')->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('hotel_img'),
                TextColumn::make('property_name'),
                TextColumn::make('rating'),
                TextColumn::make('email'),
                TextColumn::make('number'),
                TextColumn::make('rating'),
                TextColumn::make('built_year'),
                TextColumn::make('accepting_since'),
                TextColumn::make('country'),
                TextColumn::make('state'),
                TextColumn::make('city'),

                TextColumn::make('locality'),
                TextColumn::make('house_no'),
                TextColumn::make('pincode'),

                TextColumn::make('hotel_des'),
                TextColumn::make('terms'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHoteldetails::route('/'),
            'create' => Pages\CreateHoteldetails::route('/create'),
            'edit' => Pages\EditHoteldetails::route('/{record}/edit'),
        ];
    }
}
